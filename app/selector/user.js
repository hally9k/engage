import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { userSchema } from 'schema'

const getUser = (state, id) => state.data.getIn(['user', id.toString()])

const userSelector = createSelector(
    [getData, getUser],
    (data, user) => (user ? denormalize(user, userSchema, data).toJS() : null)
)

export default userSelector
