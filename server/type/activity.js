const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')

const Subject = require('./subject')

const sql = require('../connector/sql')

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
            resolve: _ => {
                return sql
                    .select()
                    .from('subject')
                    .where('id', _.subject_id)
                    .first()
                    .then(subject => subject)
            }
        }
    })
})

module.exports = ActivityType
