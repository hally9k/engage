import { fromJS, Map } from 'immutable'
import { createReducer } from 'redux-immutablejs'

// Actions
const LOADING = 'meta/LOADING'
const LOADED = 'meta/LOADED'
const UPDATE_COMPONENT_STATE = 'meta/UPDATE_COMPONENT_STATE'
const UPDATE_META_STATE = 'meta/UPDATE_META_STATE'

export const loadingMeta = () => ({ type: LOADING })
export const loadedMeta = () => ({ type: LOADED })
export const updateMetaState = payload => ({
    type: UPDATE_META_STATE,
    payload,
})
export const updateComponentState = payload => ({
    type: UPDATE_COMPONENT_STATE,
    payload,
})

// Reducer
export const INITIAL_STATE = new Map({
    currentUserId: 1,
    fetching: false,
})

export default createReducer(INITIAL_STATE, {
    [LOADING]: state => state.set('fetching', true),
    [LOADED]: state => state.set('fetching', false),
    [UPDATE_COMPONENT_STATE]: (state, { payload }) =>
        state.mergeIn(['components', payload.key], fromJS(payload.value)),
    [UPDATE_META_STATE]: (state, { payload }) => state.merge(fromJS(payload)),
})
