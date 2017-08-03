import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { userSchema } from 'schema'

const getUser = (state, id) => {
    return id
        ? state.data.getIn(['user', id.toString()])
        : state.data.get('user')
}

const userSelector = createSelector(
    [getData, getUser],
    (data, user) => (user ? denormalize(user, userSchema, data).toJS() : null)
)

export default userSelector
