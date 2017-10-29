import { createSelector } from 'reselect'
import { getUser } from 'selector/data/user'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { userSchema } from 'schema'

export const getSession = state => state.getIn(['meta', 'session'])

export default getSession

export const currentUserSelector = createSelector(
    [getData, getSession, getUser],
    (data, session, users) => {
        const user = users.find(user => {
            return user.get('id') === session.get('userId')
        })

        return denormalize(user, userSchema, data)
    }
)
