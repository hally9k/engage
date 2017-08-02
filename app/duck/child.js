import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed } from 'duck'
import { childSchema } from 'schema'
import childQuery from 'graphql/child.graphql'

// Actions
const FETCHING = 'child/FETCHING'
const RECEIVED = 'child/RECEIVED'

export const fetchingChild = () => ({ type: FETCHING })
const receivedChild = payload => ({ type: RECEIVED, payload })

// Epics
export const fetchingChildEpic = action$ =>
    action$
        .ofType(FETCHING)
        .mergeMap(() =>
            graphql.request(childQuery).then(child => [receivedChild(child)])
        )

export const receivedChildEpic = action$ =>
    action$.ofType(RECEIVED).mergeMap(({ payload }) => {
        return [processed(normalize(payload.child, [childSchema]))]
    })

export const epics = {
    fetchingChildEpic,
    receivedChildEpic
}
