// @flow

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
        firstName: {
            type: GraphQLString,
            description: 'The first name of a child.',
            resolve: obj => obj.first_name
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of a child.',
            resolve: obj => obj.last_name
        },
        age: {
            type: GraphQLInt,
            description: 'The age of a child.'
        },
        avatar: {
            type: GraphQLString,
            description: 'The image reference of the avatar of a child.'
        },
        subjects: {
            type: new GraphQLList(SubjectType),
            description: 'The subjects of a child.',
            resolve: (obj, args, ctx) => {
                ctx.ref.childId = obj.id

                return ctx.child.subjects(obj.id)
            }
        }
    })
})

export default ChildType
