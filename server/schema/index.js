const {
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType
} = require('graphql')

const UserType = require('./user')
const ChildType = require('./child')
const SubjectType = require('./subject')
const ActivityType = require('./activity')
const SessionType = require('./session')

const schema = new GraphQLSchema({
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

module.exports = schema
