import type { FunctionComponent, ReactNode } from 'react'
import { queries, render } from '@testing-library/react'
import type {
  Queries,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import I18nProvider from '../lib/i18n'

// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

const Providers: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MockedProvider>
      <I18nProvider locale="es" lngDict={{}}>
        {children}
      </I18nProvider>
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

function customRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactElement,
  options: RenderOptions<Q, Container>
): RenderResult<Q, Container> {
  return render(ui, { wrapper: Providers, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
