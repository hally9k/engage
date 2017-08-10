// @flow

import { PubSub } from 'graphql-subscriptions'
export const pubsub = new PubSub()

import ActivityType from './activity'
import ChildType from './child'
import CommentType from './comment'
import SessionType from './session'
import SubjectType from './subject'
import UserType from './user'

import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

const schema = new GraphQLSchema({
    subscription: new GraphQLObjectType({
        name: 'RootSubscriptionType',
        fields: {
            newComment: {
                type: CommentType,
                args: {
                    userId: { type: new GraphQLNonNull(GraphQLID) },
                    message: { type: new GraphQLNonNull(GraphQLString) }
                },
                subscribe: () => {
                    return pubsub.asyncIterator('newComment')
                },
                resolve: (_, x) => {
                    return x
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            comment: {
                type: CommentType,
                args: {
                    userId: { type: new GraphQLNonNull(GraphQLID) },
                    message: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (_, { userId, message }, { comment }) =>
                    comment.add(userId, message)
            }
        }
    }),
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: new GraphQLList(UserType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { user }) => user.oneOrAll(id)
            },
            child: {
                type: new GraphQLList(ChildType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { child }) => child.oneOrAll(id)
            },
            subject: {
                type: new GraphQLList(SubjectType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { subject }) => subject.oneOrAll(id)
            },
            activity: {
                type: new GraphQLList(ActivityType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { activity }) => activity.oneOrAll(id)
            },
            session: {
                type: new GraphQLList(SessionType),
                args: { id: { type: GraphQLID } },
                resolve: (_, { id }, { session }) => session.oneOrAll(id)
            }
        }
    })
})

export default schema
