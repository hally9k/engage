const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')
const Activity = require('')

const SessionType = new GraphQLObjectType({
    name: 'Subject',
    description:
    'A subject.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a subject.',
        },
        activity: {
            type: Activity,
            description: 'The title of a subject.',
        },
    }),
})

module.exports = SessionType
