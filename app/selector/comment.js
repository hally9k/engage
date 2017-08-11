import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { commentSchema } from 'schema'

const getComments = (state, id) =>
    id
        ? state.getIn(['data', 'comment', id.toString()])
        : state.getIn(['data', 'comment'])

const commentsSelector = createSelector(
    [getData, getComments],
    (data, comments) =>
        comments
            ? denormalize(comments, [commentSchema], data)
                .toList()
                .sort((a, b) => a.createdAt > b.createdAt)
                .toJS()
            : null,
)

export default commentsSelector
