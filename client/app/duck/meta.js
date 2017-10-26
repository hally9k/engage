import { fromJS, Map } from 'immutable'
import { createReducer } from 'redux-immutablejs'

// Actions
const LOADING = 'meta/LOADING'
const LOADED = 'meta/LOADED'
const UPDATE_COMPONENT_STATE = 'meta/UPDATE_COMPONENT_STATE'
const UPDATE_META_STATE = 'meta/UPDATE_META_STATE'
const ERROR = 'meta/ERROR'
const ERROR_RESET = 'meta/ERROR_RESET'

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

// Reducer
export const INITIAL_STATE = new Map({
    error: null,
    currentUserId: 1,
    fetching: false
})

export default createReducer(INITIAL_STATE, {
    [LOADING]: state => state.set('fetching', true),
    [LOADED]: state => state.set('fetching', false),
    [UPDATE_COMPONENT_STATE]: (state, { payload }) =>
        state.mergeIn(['components', payload.key], fromJS(payload.value)),
    [UPDATE_META_STATE]: (state, { payload }) => state.merge(fromJS(payload)),
    [ERROR]: (state, { error }) => state.set('error', error),
    [ERROR_RESET]: state => state.set('error', null)
})
