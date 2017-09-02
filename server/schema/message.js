// @flow

import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from 'graphql'

import UserType from './user'

const MessageType = new GraphQLObjectType({
    name: 'Message',
    description: 'A message in a conversation.',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The message\'s ID.',
        },
        user: {
            type: new GraphQLNonNull(UserType),
            description: 'The messaging user.',
            resolve: (obj, args, ctx) => ctx.user.one(obj.user_id),
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The content of a message.',
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The time that the message was sent.',
            resolve: obj => obj.created_at,
        },
    }),
})

export default MessageType
