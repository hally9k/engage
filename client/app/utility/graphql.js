import { GraphQLClient } from 'graphql-request'
import { port } from '../../config'

const graphql = new GraphQLClient(
    `http://${location.hostname}:${port}/graphql`,
    {
        mode: 'cors',
    },
)

export default graphql
