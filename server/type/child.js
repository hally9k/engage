const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')

const ChildType = new GraphQLObjectType({
    name: 'Child',
    description: 'A child.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a child.'
        },
        name: {
            type: GraphQLString,
            description: 'The name of a child.'
        },
        age: {
            type: GraphQLInt,
            description: 'The age of a child.'
        }
    })
})

module.exports = ChildType
