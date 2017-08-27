import { GraphQLClient } from 'graphql-request'

const graphql = new GraphQLClient('http://localhost:80/graphql', {
    mode: 'cors',
})

export default graphql
