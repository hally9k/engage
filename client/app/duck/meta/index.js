import { combineReducers, createReducer } from 'redux-immutablejs'
import { fromJS, Map } from 'immutable'

import profile, { epics as profileEpics } from 'duck/meta/profile'
import session, { epics as sessionEpics } from 'duck/meta/session'

const THREE_SEC = 3000

// Actions
const LOADING = 'meta/LOADING'
const LOADED = 'meta/LOADED'
const UPDATE_COMPONENT_STATE = 'meta/UPDATE_COMPONENT_STATE'
const UPDATE_META_STATE = 'meta/UPDATE_META_STATE'
const ERROR = 'meta/ERROR'
const ERROR_RESET = 'meta/ERROR_RESET'
const SUCCESS = 'meta/SUCCESS'
const SUCCESS_RESET = 'meta/SUCCESS_RESET'

export const loadingMeta = () => ({ type: LOADING })
export const loadedMeta = () => ({ type: LOADED })
export const updateMetaState = payload => ({
    type: UPDATE_META_STATE,
    payload
})
export const updateComponentState = payload => ({
    type: UPDATE_COMPONENT_STATE,
    payload
})

export const error = payload => ({
    type: ERROR,
    payload
})

export const errorReset = () => ({ type: ERROR_RESET })

export const success = payload => ({
    type: SUCCESS,
    payload
})

export const successReset = () => ({ type: SUCCESS_RESET })

// Reducer
const INITIAL_STATE = Map({
    error: null,
    success: null,
    currentUserId: 1,
    fetching: false
})

// App Reducer
const app = createReducer(INITIAL_STATE, {
    [LOADING]: state => state.set('fetching', true),
    [LOADED]: state => state.set('fetching', false),
    [UPDATE_COMPONENT_STATE]: (state, { payload }) =>
        state.mergeIn(['components', payload.key], fromJS(payload.value)),
    [UPDATE_META_STATE]: (state, { payload }) => state.merge(fromJS(payload)),
    [ERROR]: (state, { payload }) => state.set('error', payload),
    [ERROR_RESET]: state => state.set('error', null),
    [SUCCESS]: (state, { payload }) => state.set('success', payload),
    [SUCCESS_RESET]: state => state.set('success', null)
})

// Root Data Reducer
export default combineReducers({
    app,
    session,
    profile
})

// Epics
export const successEpic = action$ =>
    action$
        .ofType(SUCCESS)
        .delay(THREE_SEC)
        .mergeMap(() => [successReset()])

// Root Meta Epic
export const epics = {
    successEpic,
    ...profileEpics,
    ...sessionEpics
}
