import graphql from 'utility/graphql'
import { Map } from 'immutable'
import userQuery from 'graphql/user.graphql'
import { FETCHING, RECEIVED, received } from 'duck'
import { normalize, schema } from 'normalizr'

const subjectSchema = new schema.Entity('subject')
const childSchema = new schema.Entity('child', {
    subjects: [subjectSchema]
})
const userSchema = new schema.Entity('user', {
    children: [childSchema]
})

// Actions
const PROCESSED = 'data/PROCESSED'
const processed = payload => ({ type: PROCESSED, payload })

// Reducer
export const INITIAL_STATE = Map({
    data: Map()
})

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.set('data', action.payload)
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
