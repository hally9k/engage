import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux-immutablejs'

import router from 'router'
import meta from 'duck/meta'
import child, { epics as childEpics } from 'duck/child'
import subject, { epics as subjectEpics } from 'duck/subject'
import user, { epics as userEpics } from 'duck/user'
import conversation, { epics as conversationEpics } from 'duck/conversation'
import message, { epics as messageEpics } from 'duck/message'
import session, { epics as sessionEpics } from 'duck/session'
import { epics as profileEpics } from 'duck/profile'

// Data Actions
export const PROCESSED = 'data/PROCESSED'
export const processed = payload => ({ type: PROCESSED, payload })

// Root Reducer
export const reducers = combineReducers({
    location: router.reducer,
    data: combineReducers({
        child,
        conversation,
        message,
        subject,
        user
    }),
    session,
    meta
})

// Root Epic
export const epics = combineEpics(
    ...Object.values(childEpics),
    ...Object.values(subjectEpics),
    ...Object.values(userEpics),
    ...Object.values(conversationEpics),
    ...Object.values(messageEpics),
    ...Object.values(sessionEpics),
    ...Object.values(profileEpics)
)
