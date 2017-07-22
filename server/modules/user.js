const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    description:
    'A user.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a user.',
        },
        firstName: {
            type: GraphQLString,
            description: 'The first name of a user.',
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of a user.',
        },
        email: {
            type: GraphQLString,
            description: 'The email address of a user.',
        },
    }),
})

module.exports = UserType
