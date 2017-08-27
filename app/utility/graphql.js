import { GraphQLClient } from 'graphql-request'

const graphql = new GraphQLClient('http://localhost:8000/graphql', {
    mode: 'cors',
})

export default graphql
