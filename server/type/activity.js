const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')

const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    description: 'An activity.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of an activity.'
        },
        difficulty: {
            type: GraphQLInt,
            description: 'The difficulty level of an activity.'
        },
        hint: {
            type: GraphQLString,
            description: 'A hint about an activity.'
        },
        description: {
            type: GraphQLString,
            description: 'The description of an activity.'
        }
    })
})

module.exports = ActivityType
