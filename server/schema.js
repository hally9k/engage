const gql = require('graphql')
const User = require('./modules/user')

const {
    GraphQLSchema,
    GraphQLList,
    GraphQLObjectType
  } = gql

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '',
        database : 'engage'
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: new GraphQLList(User),
                resolve: (_, args) => {
                    return args.id
                        ? knex.select().from('user').where('id', args.id).then((user) => user)
                        : knex.select().from('user').then((users) => users)
                }
            }// ,
            // child: {
            //   type: new GraphQLList(Child),
            //   resolve: (_, args) => {
            //     return args.id
            //     ? knex.select().from('child').where('id', args.id).then(child => child)
            //     : knex.select().from('child').then(children => children)
            //   }
            // },
            // subject: {
            //   type: new GraphQLList(Subject),
            //   resolve: (_, args) => {
            //     return args.id
            //     ? knex.select().from('subject').where('id', args.id).then(subject => subject)
            //     : knex.select().from('subject').then(subjects => subjects)
            //   }
            // },
            // activity: {
            //   type: new GraphQLList(Activity),
            //   resolve: (_, args) => {
            //     return args.id
            //     ? knex.select().from('activity').where('id', args.id).then(activity => activity)
            //     : knex.select().from('activity').then(activitys => activitys)
            //   }
            // },
            // session: {
            //   type: new GraphQLList(Activity),
            //   resolve: (_, args) => {
            //     return args.id
            //     ? knex.select().from('session').where('id', args.id).then(session => session)
            //     : knex.select().from('session').then(sessions => sessions)
            //   }
            // }
        }
    })
})

module.exports = schema
