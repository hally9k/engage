import { Map } from 'immutable'

import { FETCHING, RECEIVED } from 'duck'

// Reducer
export const INITIAL_STATE = new Map({
    fetching: false
})

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case FETCHING:
            return state.set('fetching', true)
        case RECEIVED:
            return state.set('fetching', false)
        default:
            return state
    }
}

// Action Creators
export const fetching = () => ({ type: FETCHING })
export const received = data => ({ type: RECEIVED, payload: data })
