import { useContext } from 'react'
import { I18nContext } from '../lib/i18n'
import type { I18nWrapper } from '../lib/i18n'

export default function useI18n(): I18nWrapper {
  const i18n = useContext(I18nContext)
  return i18n
}
