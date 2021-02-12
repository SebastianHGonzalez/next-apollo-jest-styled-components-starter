import getConfig from 'next/config'
import {
  introspectSchema,
  makeRemoteExecutableSchema,
} from 'apollo-server-micro'
import { setContext } from 'apollo-link-context'
import type { ContextSetter } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import type { GraphQLSchema } from 'graphql'

const authorizationSetter: ContextSetter = (request, previousContext) => {
  const token = previousContext?.graphqlContext?.token

  return {
    headers: {
      Authorization: token && `Bearer ${token}`,
    },
  }
}

async function createRemoteSchema(uri) {
  const http = new HttpLink({ uri, fetch })

  const link = setContext(authorizationSetter).concat(http)

  const schema = await introspectSchema(link)

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  })

  return executableSchema
}

export default function createSchema(): Promise<GraphQLSchema> {
  const {
    serverRuntimeConfig: { checkoutApiURL },
  } = getConfig()

  return createRemoteSchema(checkoutApiURL)
}
