// @flow

import {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'A comment.',
    fields: () => ({
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of a user.'
        },
        message: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The content of a comment.'
        }
    })
})

export default CommentType
