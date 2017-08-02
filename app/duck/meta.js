import { Map } from 'immutable'

// Actions
const LOADING = 'meta/LOADING'
const LOADED = 'meta/LOADED'

export const loadingMeta = () => ({ type: LOADING })
export const loadedMeta = () => ({ type: LOADED })

// Reducer
export const INITIAL_STATE = new Map({
    fetching: false
})

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case LOADING:
            return state.set('fetching', true)
        case LOADED:
            return state.set('fetching', false)
        default:
            return state
    }
}
