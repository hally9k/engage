import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { fromJS, Map } from 'immutable'

import meta from 'duck/meta'
import { epics as childEpics } from 'duck/child'
import { epics as subjectEpics } from 'duck/subject'
import { epics as userEpics } from 'duck/user'

// Data Actions
export const PROCESSED = 'data/PROCESSED'
export const processed = payload => ({ type: PROCESSED, payload })

// Data Reducer
const INITIAL_STATE = Map()

const data = (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.mergeDeep(fromJS(action.payload.entities))
        default:
            return state
    }
}

// Root Reducer
export const reducers = combineReducers({
    data,
    meta
})

// Root Epic
export const epics = combineEpics(
    ...Object.values(childEpics),
    ...Object.values(subjectEpics),
    ...Object.values(userEpics)
)
