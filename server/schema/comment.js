// @flow

import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql'

import UserType from './user'

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'A comment.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The comment\'s ID.'
        },
        user: {
            type: UserType,
            description: 'The commenting user.',
            resolve: (obj, args, ctx) => {
                // TODO: fix this snake case issue.
                return ctx.user.one(obj.user_id ? obj.user_id : obj.userId)
            }
        },
        message: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The content of a comment.'
        },
        channel: {
            type: GraphQLString,
            description: 'The channel that a comment belongs to.'
        }
    })
})

export default CommentType
