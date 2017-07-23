const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql')

const Activity = require('./activity')
const User = require('./user')
const Child = require('./child')

const sql = require('../connector/sql')

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
            resolve: _ => _.created_at
        },
        activity: {
            type: Activity,
            description: 'The activity for a session.',
            resolve: _ =>
                sql
                    .select()
                    .from('activity')
                    .where('id', _.activity_id)
                    .first()
                    .then(activity => activity)
        },
        user: {
            type: User,
            description: 'The user of a session.',
            resolve: _ =>
                sql
                    .select()
                    .from('user')
                    .where('id', _.user_id)
                    .first()
                    .then(user => user)
        },
        child: {
            type: Child,
            description: 'The user of a session.',
            resolve: _ =>
                sql
                    .select()
                    .from('child')
                    .where('id', _.child_id)
                    .first()
                    .then(child => child)
        }
    })
})

module.exports = SessionType
