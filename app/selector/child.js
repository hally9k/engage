import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { childSchema } from 'schema'

const getChild = (state, id) =>
    id ? state.getIn(['data', 'child', id.toString()]) : state.getIn(['data', 'child'])

const childSelector = createSelector(
    [getData, getChild],
    (data, child) =>
        child ? denormalize(child, childSchema, data).toJS() : null
)

export default childSelector
