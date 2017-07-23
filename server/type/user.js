const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList
} = require('graphql')

const Child = require('./child')

const sql = require('../connector/sql')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a user.'
        },
        firstName: {
            type: GraphQLString,
            description: 'The first name of a user.'
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of a user.'
        },
        email: {
            type: GraphQLString,
            description: 'The email address of a user.'
        },
        children: {
            type: new GraphQLList(Child),
            description: 'The children of a user.',
            resolve: _ => {
                return sql
                    .select()
                    .from('user_child')
                    .innerJoin('child', 'id', 'child_id')
                    .where('user_id', _.id)
                    .then(child => child)
            }
        }
    })
})

module.exports = UserType
