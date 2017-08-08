import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import { childSchema } from 'schema'
import childQuery from 'graphql/child.graphql'
import { fromJS, Map } from 'immutable'

// Actions
const FETCHING = 'child/FETCHING'
const RECEIVED = 'child/RECEIVED'

export const fetchingChild = payload => ({ type: FETCHING, payload })
const receivedChild = payload => ({ type: RECEIVED, payload })

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.merge(fromJS(action.payload.entities.child))
        default:
            return state
    }
}

// Epics
export const fetchingChildEpic = action$ =>
    action$
        .ofType(FETCHING)
        .mergeMap(({ payload: id }) =>
            graphql
                .request(childQuery, { id })
                .then(child => [receivedChild(child)])
        )

export const receivedChildEpic = action$ =>
    action$.ofType(RECEIVED).mergeMap(({ payload }) => {
        return [processed(normalize(payload.child, [childSchema]))]
    })

export const epics = {
    fetchingChildEpic,
    receivedChildEpic
}
