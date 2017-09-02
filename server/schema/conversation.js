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
            resolve: (obj, args, { conversation }) =>
                conversation.allUsers(obj.id),
        },
        messages: {
            type: new GraphQLList(MessageType),
            description: 'The messages in a conversation.',
            resolve: (obj, args, { message }) => message.all(obj.id),
        },
        channel: {
            type: GraphQLString,
            description: 'The channel identifier.',
        },
    }),
})

export default ConversationType
