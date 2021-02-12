import { GetServerSidePropsResult } from 'next'
import { createContext, useState, useRef, useEffect } from 'react'
import rosetta from 'rosetta'
// import rosetta from 'rosetta/debug';

const i18n = rosetta()

type LanguageDictionary = Record<string, unknown>

export const defaultLanguage = 'en'
export const languages = ['de', 'en']
export const contentLanguageMap = { de: 'de-DE', en: 'en-US' }

export interface I18nWrapper {
  activeLocale: string
  t: typeof i18n.t
  locale: (l: string, dict: LanguageDictionary) => void
}

export const I18nContext = createContext<I18nWrapper>(null)

// default language
i18n.locale(defaultLanguage)

interface I18nProps {
  children: React.ReactNode
  locale: string
  lngDict: LanguageDictionary
}

export default function I18nProvider({
  children,
  locale,
  lngDict,
}: I18nProps): JSX.Element {
  const activeLocaleRef = useRef<string>(locale || defaultLanguage)
  const [, setTick] = useState(0)
  const firstRender = useRef(true)

  const i18nWrapper: I18nWrapper = {
    activeLocale: activeLocaleRef.current,
    t: (...args) => i18n.t(...args),
    locale: (l, dict) => {
      i18n.locale(l)
      activeLocaleRef.current = l
      if (dict) {
        i18n.set(l, dict)
      }
      // force rerender to update view
      setTick((tick) => tick + 1)
    },
  }

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false
    i18nWrapper.locale(locale, lngDict)
  }

  // when locale is updated
  useEffect(() => {
    if (locale) {
      i18nWrapper.locale(locale, lngDict)
    }
  }, [lngDict, locale])

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  )
}

export async function addLocaleState<T extends Record<string, unknown>>(
  locale: string,
  pageProps: GetServerSidePropsResult<T>
): Promise<
  GetServerSidePropsResult<
    T & {
      lngDict?: string
      locale?: string
    }
  >
> {
  if ((pageProps as any)?.props) {
    const { default: lngDict = {} } = await import(`../locales/${locale}.json`)

    ;(pageProps as any).props.lngDict = lngDict
    ;(pageProps as any).props.locale = locale
  }

  return pageProps
}
