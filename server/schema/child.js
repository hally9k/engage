import SubjectType from './subject'

import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

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
            type: new GraphQLList(SubjectType),
            description: 'The subjects of a child.',
            resolve: (obj, args, { child }) => child.subjects(obj.id)
        }
    })
})

export default ChildType
