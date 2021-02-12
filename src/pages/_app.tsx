import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/dist/next-server/lib/router/router'

import { useApollo } from '../lib/apolloClient'
import I18nProvider from '../lib/i18n'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <I18nProvider lngDict={pageProps.lngDict} locale={pageProps.locale}>
        <Component {...pageProps} />
      </I18nProvider>
    </ApolloProvider>
  )
}
