import gql from 'graphql-tag'

export default gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`
