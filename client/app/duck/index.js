import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux-immutablejs'

import router from 'router'

import data, { epics as dataEpics } from 'duck/data'
import meta, { epics as metaEpics } from 'duck/meta'

// Data Actions
export const PROCESSED = 'data/PROCESSED'
export const processed = payload => ({ type: PROCESSED, payload })

// Root Reducer
export const reducers = combineReducers({
    location: router.reducer,
    data,
    meta
})

// Root Epic
export const epics = combineEpics(
    ...Object.values(dataEpics),
    ...Object.values(metaEpics)
)
