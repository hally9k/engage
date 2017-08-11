import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux-immutablejs'

import meta from 'duck/meta'
import child, { epics as childEpics } from 'duck/child'
import subject, { epics as subjectEpics } from 'duck/subject'
import user, { epics as userEpics } from 'duck/user'
import comment, { epics as commentEpics } from 'duck/comment'

// Data Actions
export const PROCESSED = 'data/PROCESSED'
export const processed = payload => ({ type: PROCESSED, payload })

// Root Reducer
export const reducers = combineReducers({
    data: combineReducers({
        child,
        comment,
        subject,
        user
    }),
    meta
})

// Root Epic
export const epics = combineEpics(
    ...Object.values(childEpics),
    ...Object.values(subjectEpics),
    ...Object.values(userEpics),
    ...Object.values(commentEpics)
)
