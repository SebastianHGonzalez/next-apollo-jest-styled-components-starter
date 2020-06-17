import { render } from '@testing-library/react'
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"
import { ThemeProvider } from 'styled-components'
import { MockedProvider } from '@apollo/react-testing'

import { ViewerQuery } from '../apollo/queries'
import theme from '../theme'

const mocks = [
  {
    request: {
      query: ViewerQuery,
    },
    result: {
      data: {
        viewer: { id: '1', name: 'Buck', status: 'up' },
      },
    },
  },
]

const Providers = ({ children }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MockedProvider>
  )
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
