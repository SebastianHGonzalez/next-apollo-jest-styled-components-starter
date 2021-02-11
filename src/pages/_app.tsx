import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/dist/next-server/lib/router/router'

import { useApollo } from '../lib/apolloClient'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
