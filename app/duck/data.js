import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import userQuery from 'graphql/user.graphql'
import { userSchema } from 'schema'
import { FETCHING, RECEIVED, received } from 'duck'
import { fromJS, Map } from 'immutable'
// Actions
const PROCESSED = 'data/PROCESSED'
const processed = payload => ({ type: PROCESSED, payload })

// Reducer
export const INITIAL_STATE = Map({
    user: null,
    subject: null,
    child: null
})

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return fromJS(action.payload.entities)
        default:
            return state
    }
}

// Epics
export const fetchingEpic = action$ =>
    action$
        .ofType(FETCHING)
        .mergeMap(() =>
            graphql.request(userQuery).then(data => [received(data)])
        )

export const receivedEpic = action$ =>
    action$
        .ofType(RECEIVED)
        .mergeMap(({ payload }) => [
            processed(normalize(payload.user, [userSchema]))
        ])

export const epics = {
    fetchingEpic,
    receivedEpic
}
