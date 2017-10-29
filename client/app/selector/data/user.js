import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { userSchema } from 'schema'

export const getUser = (state, id) => {
    return id
        ? state.getIn(['data', 'user', id.toString()])
        : state.getIn(['data', 'user'])
}

const userSelector = createSelector(
    [getData, getUser],
    (data, user) => (user ? denormalize(user, userSchema, data) : null)
)

export default userSelector
