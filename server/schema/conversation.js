// @flow

import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from 'graphql'

import MessageType from './message'
import UserType from './user'

const ConversationType = new GraphQLObjectType({
    name: 'Conversation',
    description: 'A conversation between users.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The conversation\'s ID.',
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'The users subscribed to the conversation.',
            resolve: (obj, args, ctx) => ctx.user.one(obj.user_id),
        },
        messages: {
            type: new GraphQLList(MessageType),
            description: 'The content of a comment.',
        },
        channel: {
            type: GraphQLString,
            description: 'The channel that a comment belongs to.',
        },
        createdAt: {
            type: GraphQLString,
            description: 'The date and time that comment was made.',
            resolve: obj => obj.created_at,
        },
    }),
})

export default ConversationType
