import ActivityType from './activity'
import ChildType from './child'
import UserType from './user'

import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'

const SessionType = new GraphQLObjectType({
    name: 'Session',
    description: 'A session.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a session.'
        },
        score: {
            type: GraphQLInt,
            description: 'The the percentage scored by the child in a session.'
        },
        notes: {
            type: GraphQLString,
            description: 'Notes taken about a session.'
        },
        createdAt: {
            type: GraphQLString,
            description: 'Notes taken about a session.',
            resolve: obj => obj.created_at
        },
        activity: {
            type: ActivityType,
            description: 'The activity for a session.',
            resolve: (_, args, { activity }) => activity.one(_.activity_id)
        },
        user: {
            type: UserType,
            description: 'The user of a session.',
            resolve: (_, args, { user }) => user.one(_.user_id)
        },
        child: {
            type: ChildType,
            description: 'The user of a session.',
            resolve: (_, args, { child }) => child.one(_.child_id)
        }
    })
})

export default SessionType
