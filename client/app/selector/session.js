import { createSelector } from 'reselect'
import { getUser } from 'selector/user'

const getSession = state => state.get('session')

export default getSession

export const currentUserSelector = createSelector(
    [getSession, getUser],
    ({ userId }, users) => {
        return users.find(({ id }) => {
            return id === userId
        })
    }
)
