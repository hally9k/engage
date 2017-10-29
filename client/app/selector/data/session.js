import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { sessionSchema } from 'schema'

const getRecentSessions = (state, childId, n) => {
    return state
        .getIn(['data', 'session'])
        .filter(session => session.get('child') === childId)
        .sortBy(session => session.createdAt)
        .take(n)
        .toList()
}

const recentSessionsSelector = createSelector(
    [getData, getRecentSessions],
    (data, sessions) => {
        return sessions.size
            ? denormalize(sessions, [sessionSchema], data)
            : null
    }
)

export default recentSessionsSelector
