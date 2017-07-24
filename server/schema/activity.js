import Subject from './subject'

import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'

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
            type: Subject,
            description: 'The subject an activity belongs to.',
            resolve: (obj, args, { subject }) => subject.one(obj.subject_id)
        }
    })
})

export default ActivityType
