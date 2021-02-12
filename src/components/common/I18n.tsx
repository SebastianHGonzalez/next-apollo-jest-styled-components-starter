import React from 'react'
import useI18n from '../../hooks/useI18n'

interface Props {
  id: string | (string | number)[]
  params?: Record<string, unknown>
  lang?: string
}

export default function I18n({ id, params, lang }: Props): JSX.Element {
  const i18n = useI18n()
  return <>{i18n.t(id, params, lang) || id}</>
}
