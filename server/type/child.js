const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList
} = require('graphql')

const Subject = require('./subject')

const sql = require('../connector/sql')

const ChildType = new GraphQLObjectType({
    name: 'Child',
    description: 'A child.',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of a child.'
        },
        name: {
            type: GraphQLString,
            description: 'The name of a child.'
        },
        age: {
            type: GraphQLInt,
            description: 'The age of a child.'
        },
        subjects: {
            type: new GraphQLList(Subject),
            description: 'The subjects of a child.',
            resolve: _ =>
                sql
                    .select()
                    .from('child_subject')
                    .innerJoin('subject', 'child_id', 'id')
                    .where('child_id', _.id)
                    .then(subjects => subjects)
        }
    })
})

module.exports = ChildType
