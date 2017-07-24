import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'

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
        }
    })
})

export default SubjectType
