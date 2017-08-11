// @flow

import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql'
import ActivityType from './activity'

const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    description: 'A subject.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a subject.'
        },
        title: {
            type: GraphQLString,
            description: 'The title of a subject.'
        },
        activities: {
            type: new GraphQLList(ActivityType),
            description: 'The activities for a subject.',
            resolve: (obj, args, { subject }) => subject.activities(obj.id)
        }
    })
})

export default SubjectType
