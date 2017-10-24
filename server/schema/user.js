// @flow

import ChildType from './child'

import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

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
            description: 'The first name of a user.',
            resolve: obj => obj.first_name,
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of a user.',
            resolve: obj => obj.last_name,
        },
        email: {
            type: GraphQLString,
            description: 'The email address of a user.'
        },
        children: {
            type: new GraphQLList(ChildType),
            description: 'The children of a user.',
            resolve: (obj, args, { user }) => user.children(obj.id)
        }
    })
})

export default UserType
