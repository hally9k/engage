import { createSelector } from 'reselect'
import { getUser } from 'selector/user'

const getSession = state => state.getIn(['meta', 'session'])

export default getSession

export const currentUserSelector = createSelector(
    [getSession, getUser],
    (session, users) => {
        return users.find(user => {
            return user.get('id') === session.get('userId')
        })
    }
)
