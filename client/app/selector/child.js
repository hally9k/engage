import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { childSchema } from 'schema'

const getChild = (state, id) => state.getIn(['data', 'child', id.toString()])

export const getAllChildren = state => state.getIn(['data', 'child'])

const childSelector = createSelector(
    [getData, getChild],
    (data, child) => (child ? denormalize(child, childSchema, data) : null)
)

export default childSelector
