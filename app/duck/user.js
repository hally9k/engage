import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import userQuery from 'graphql/user.graphql'
import { userSchema } from 'schema'
import { fromJS, Map } from 'immutable'

// Actions
const FETCHING = 'user/FETCHING'
const RECEIVED = 'user/RECEIVED'

export const fetchingUser = () => ({ type: FETCHING })
const receivedUser = payload => ({ type: RECEIVED, payload })

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.merge(fromJS(action.payload.entities.user))
        default:
            return state
    }
}

// Epics
export const fetchingUserEpic = action$ =>
    action$
        .ofType(FETCHING)
        .mergeMap(({ payload: id }) =>
            graphql
                .request(userQuery, { id })
                .then(user => [receivedUser(user)])
        )

export const receivedUserEpic = action$ =>
    action$.ofType(RECEIVED).mergeMap(({ payload }) => {
        return [processed(normalize(payload.user, [userSchema]))]
    })

export const epics = {
    fetchingUserEpic,
    receivedUserEpic
}
