import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import createSchema from '../../lib/schema'

let handler: NextApiHandler

async function getHandler(): Promise<NextApiHandler> {
  if (handler) return handler

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
  })

  handler = apolloServer.createHandler({ path: '/api/graphql' })

  return handler
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const metaHandler: NextApiHandler = async (req, res) =>
  (await getHandler())(req, res)

export default metaHandler
