import { GraphQLClient } from 'graphql-request'
import { port } from 'config'

const graphql = new GraphQLClient(`http://localhost:${port}/graphql`, {
    mode: 'cors',
})

export default graphql
