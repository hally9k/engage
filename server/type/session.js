const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')

const SessionType = new GraphQLObjectType({
    name: 'Session',
    description: 'A session.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a session.'
        },
        score: {
            type: GraphQLInt,
            description: 'The the percentage scored by the child in a session.'
        },
        notes: {
            type: GraphQLString,
            description: 'Notes taken about a session.'
        },
        createdAt: {
            type: GraphQLString,
            description: 'Notes taken about a session.',
            resolve: (_) => _.created_at
        }
    })
})

module.exports = SessionType
