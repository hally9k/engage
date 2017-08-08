import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import subjectQuery from 'graphql/subject.graphql'
import { subjectSchema } from 'schema'
import { fromJS, Map } from 'immutable'

// Actions
const FETCHING = 'subject/FETCHING'
const RECEIVED = 'subject/RECEIVED'

export const fetchingSubject = () => ({ type: FETCHING })
const receivedSubject = payload => ({ type: RECEIVED, payload })

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.merge(fromJS(action.payload.entities.subject))
        default:
            return state
    }
}

// Epics
export const fetchingSubjectEpic = action$ =>
    action$
        .ofType(FETCHING)
        .mergeMap(({ payload: id }) =>
            graphql
                .request(subjectQuery, { id })
                .then(subject => [receivedSubject(subject)])
        )

export const receivedSubjectEpic = action$ =>
    action$.ofType(RECEIVED).mergeMap(({ payload }) => {
        return [processed(normalize(payload.subject, [subjectSchema]))]
    })

export const epics = {
    fetchingSubjectEpic,
    receivedSubjectEpic
}
