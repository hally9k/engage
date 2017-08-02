import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { userSchema } from 'schema'

const getEntities = state => state.data
const getUser = (state, id) => {
    return state.data.getIn(['user', id.toString()])
}

const userSelector = createSelector(
    [getEntities, getUser],
    (entities, user) =>
        user ? denormalize(user, userSchema, entities).toJS() : null
)

export default userSelector
