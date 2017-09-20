// @flow

import { PubSub } from 'graphql-subscriptions'
export const pubsub = new PubSub()

import ActivityType from './activity'
import ChildType from './child'
import ConversationType from './conversation'
import MessageType from './message'
import SessionType from './session'
import SubjectType from './subject'
import UserType from './user'

import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql'

const schema = new GraphQLSchema({
    subscription: new GraphQLObjectType({
        name: 'RootSubscriptionType',
        fields: {
            conversation: {
                type: MessageType,
                args: {
                    channel: { type: new GraphQLNonNull(GraphQLString) },
                },
                subscribe: (_, { channel }, { redis, message }) => {
                    redis.sub.subscribe(channel)

                    redis.sub.on('message', function(channel, newMessage) {
                        const { id } = JSON.parse(newMessage)

                        pubsub.publish(channel, {
                            conversation: message.one(id),
                        })
                    })

                    return pubsub.asyncIterator(channel)
                },
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            conversation: {
                type: new GraphQLList(ConversationType),
                args: {
                    userId: { type: new GraphQLNonNull(GraphQLID) },
                    channel: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: (_, { userId, channel }, { conversation }) => {
                    return conversation.add(Number.parseInt(userId), channel)
                },
            },
            message: {
                type: MessageType,
                args: {
                    content: { type: new GraphQLNonNull(GraphQLString) },
                    userId: { type: new GraphQLNonNull(GraphQLID) },
                    conversationId: { type: new GraphQLNonNull(GraphQLID) },
                    channel: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: (
                    _,
                    { content, userId, conversationId, channel },
                    { message },
                ) => message.add(content, userId, conversationId, channel),
            },
        },
    }),
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: new GraphQLList(UserType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { user }) => user.oneOrAll(id),
            },
            child: {
                type: new GraphQLList(ChildType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { child }) => child.oneOrAll(id),
            },
            conversation: {
                type: new GraphQLList(ConversationType),
                args: { userId: { type: GraphQLID } },
                resolve: (_, { userId }, { conversation }) =>
                    conversation.all(Number.parseInt(userId)),
            },
            subject: {
                type: new GraphQLList(SubjectType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { subject }) => subject.oneOrAll(id),
            },
            activity: {
                type: new GraphQLList(ActivityType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { activity }) => activity.oneOrAll(id),
            },
            session: {
                type: new GraphQLList(SessionType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { session }) => session.oneOrAll(id),
            },
        },
    }),
})

export default schema
