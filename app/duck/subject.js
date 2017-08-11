import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed } from 'duck'
import subjectQuery from 'graphql/query/subject.graphql'
import { subjectSchema } from 'schema'

// Actions
const FETCHING = 'subject/FETCHING'
const RECEIVED = 'subject/RECEIVED'

export const fetchingSubject = () => ({ type: FETCHING })
const receivedSubject = payload => ({ type: RECEIVED, payload })

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
