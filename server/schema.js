const User = require('./type/user')
const Child = require('./type/child')
const Subject = require('./type/subject')
const Activity = require('./type/activity')
const Session = require('./type/session')
const { GraphQLSchema, GraphQLList, GraphQLObjectType } = require('graphql')
const sql = require('./connector/sql')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: new GraphQLList(User),
                resolve: (_, args) => {
                    return args.id
                        ? sql
                            .select()
                            .from('user')
                            .where('id', args.id)
                            .then((user) => user)
                        : sql.select().from('user').then((users) => users)
                }
            },
            child: {
                type: new GraphQLList(Child),
                resolve: (_, args) => {
                    return args.id
                        ? sql
                            .select()
                            .from('child')
                            .where('id', args.id)
                            .then((child) => child)
                        : sql.select().from('child').then((children) => children)
                }
            },
            subject: {
                type: new GraphQLList(Subject),
                resolve: (_, args) => {
                    return args.id
                        ? sql
                            .select()
                            .from('subject')
                            .where('id', args.id)
                            .then((subject) => subject)
                        : sql
                            .select()
                            .from('subject')
                            .then((subjects) => subjects)
                }
            },
            activity: {
                type: new GraphQLList(Activity),
                resolve: (_, args) => {
                    return args.id
                        ? sql
                            .select()
                            .from('activity')
                            .where('id', args.id)
                            .then((activity) => activity)
                        : sql
                            .select()
                            .from('activity')
                            .then((activitys) => activitys)
                }
            },
            session: {
                type: new GraphQLList(Session),
                resolve: (_, args) => {
                    return args.id
                        ? sql
                            .select()
                            .from('session')
                            .where('id', args.id)
                            .then((session) => session)
                        : sql
                            .select()
                            .from('session')
                            .then((sessions) => sessions)
                }
            }
        }
    })
})

module.exports = schema
