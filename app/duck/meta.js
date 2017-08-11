import { fromJS, Map } from 'immutable'

// Actions
const LOADING = 'meta/LOADING'
const LOADED = 'meta/LOADED'
const UPDATE_COMPONENT_STATE = 'meta/UPDATE_COMPONENT_STATE'

export const loadingMeta = () => ({ type: LOADING })
export const loadedMeta = () => ({ type: LOADED })
export const updateComponentState = payload => ({
    type: UPDATE_COMPONENT_STATE,
    payload
})

// Reducer
export const INITIAL_STATE = new Map({
    currentUser: 1,
    fetching: false
})

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case LOADING:
            return state.set('fetching', true)
        case LOADED:
            return state.set('fetching', false)
        case UPDATE_COMPONENT_STATE:
            return state.mergeIn(
                ['components', action.payload.key],
                fromJS(action.payload.value)
            )
        default:
            return state
    }
}
