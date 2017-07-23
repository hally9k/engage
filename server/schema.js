const {
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType
} = require('graphql')

const User = require('./type/user')
const Child = require('./type/child')
const Subject = require('./type/subject')
const Activity = require('./type/activity')
const Session = require('./type/session')

const sql = require('./connector/sql')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: new GraphQLList(User),
                args: {
                    id: { type: GraphQLID }
                },
                resolve: (_, args) =>
                    args.id
                        ? sql
                            .select()
                            .from('user')
                            .where('id', args.id)
                            .then(user => user)
                        : sql.select().from('user').then(users => users)
            },
            child: {
                type: new GraphQLList(Child),
                args: {
                    id: { type: GraphQLID }
                },
                resolve: (_, args) =>
                    args.id
                        ? sql
                            .select()
                            .from('child')
                            .where('id', args.id)
                            .then(child => child)
                        : sql.select().from('child').then(children => children)
            },
            subject: {
                type: new GraphQLList(Subject),
                args: {
                    id: { type: GraphQLID }
                },
                resolve: (_, args) =>
                    args.id
                        ? sql
                            .select()
                            .from('subject')
                            .where('id', args.id)
                            .then(subject => subject)
                        : sql
                            .select()
                            .from('subject')
                            .then(subjects => subjects)
            },
            activity: {
                type: new GraphQLList(Activity),
                args: {
                    id: { type: GraphQLID }
                },
                resolve: (_, args) =>
                    args.id
                        ? sql
                            .select()
                            .from('activity')
                            .where('id', args.id)
                            .then(activity => activity)
                        : sql
                            .select()
                            .from('activity')
                            .then(activities => activities)
            },
            session: {
                type: new GraphQLList(Session),
                args: {
                    id: { type: GraphQLID }
                },
                resolve: (_, args) =>
                    args.id
                        ? sql
                            .select()
                            .from('session')
                            .where('id', args.id)
                            .then(session => session)
                        : sql
                            .select()
                            .from('session')
                            .then(sessions => sessions)
            }
        }
    })
})

module.exports = schema
