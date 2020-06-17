import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

import { initializeApollo } from '../apollo/client'
import { ViewerQuery } from '../apollo/queries'

const Button = styled.button`
  border: 1px solid red;
`

export default function Home() {
  const { data } = useQuery(ViewerQuery)

  return (
    <div>
      You&apos;re signed in as {data?.viewer.name} and you&apos;re{' '}
      {data?.viewer.status} goto{' '}
      <Button onClick={() => window.alert('With typescript and Jest')}>
        Test Button
      </Button>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
