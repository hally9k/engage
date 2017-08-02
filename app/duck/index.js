import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import metaReducers from 'duck/meta'
import dataReducers, { epics as dataEpics } from 'duck/data'

// Core Actions
export const FETCHING = 'core/FETCHING'
export const RECEIVED = 'core/RECEIVED'

// Core Action Creators
export const fetching = () => ({ type: FETCHING })
export const received = data => ({ type: RECEIVED, payload: data })

export const reducers = combineReducers({
    dataReducers,
    metaReducers
})
export const epics = combineEpics(...Object.values(dataEpics))
