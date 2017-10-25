import { createSelector } from 'reselect'
import { getUser } from 'selector/user'

const getSession = state => state.get('session')

export default getSession

export const currentUserSelector = createSelector(
    [getSession, getUser],
    (session, users) => {
        return users.find(user => {
            return user.get('id') === session.get('userId')
        })
    }
)
