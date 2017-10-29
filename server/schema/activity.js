import SubjectType from './subject'
import SessionType from './session'

import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    description: 'An activity.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of an activity.'
        },
        difficulty: {
            type: GraphQLInt,
            description: 'The difficulty level of an activity.'
        },
        hint: {
            type: GraphQLString,
            description: 'A hint about an activity.'
        },
        description: {
            type: GraphQLString,
            description: 'The description of an activity.'
        },
        subject: {
            type: SubjectType,
            description: 'The subject an activity belongs to.',
            resolve: (obj, args, { subject }) => subject.one(obj.subject_id)
        },
        sessions: {
            type: new GraphQLList(SessionType),
            description: 'The sessions for an activity.',
            resolve: (obj, args, ctx) => {
                return ctx.session.allForChildsActivity(ctx.ref.childId, obj.id)
            }
        }
    })
})

export default ActivityType
