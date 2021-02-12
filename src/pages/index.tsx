import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import styled from 'styled-components'
import I18n from '../components/common/I18n'

import { addLocaleState } from '../lib/i18n'

const Title = styled.h1`
  color: black;
  font-size: 50px;
`

export default function Home(): JSX.Element {
  return (
    <Title>
      <I18n id="helloWorld" />
    </Title>
  )
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> {
  return await addLocaleState(locale, {
    props: {},
  })
}
