// @flow

import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} from 'graphql'

import MessageType from './message'
import UserType from './user'

const ConversationType = new GraphQLObjectType({
    name: 'Conversation',
    description: 'A conversation between users.',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The conversation\'s ID.',
        },
        messages: {
            type: new GraphQLList(MessageType),
            description: 'The messages in a conversation.',
            resolve: (obj, args, { message }) => {
                return message.all(obj.id)
            },
        },
        channel: {
            type: GraphQLString,
            description: 'The channel identifier.',
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'The users subscribed to the conversation.',
            resolve: (obj, args, { conversation }) => {
                return conversation.allUsers(obj.id)
            },
        },
    }),
})

export default ConversationType
