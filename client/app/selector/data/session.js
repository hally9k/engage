import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { sessionSchema } from 'schema'

const getMostRecentSessions = (state, childId, n) => {
    return state
        .getIn(['data', 'session'])
        .filter(session => {
            return session.childId === childId
        })
        .sortBy('createdAt')
        .take(n)
}

const mostRecentSessionSelector = createSelector(
    [getData, getMostRecentSessions],
    (data, sessions) =>
        sessions ? denormalize(sessions, [sessionSchema], data) : null
)

export default mostRecentSessionSelector
