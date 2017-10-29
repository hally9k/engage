import { PROCESSED } from 'duck'
import { fromJS, Map } from 'immutable'

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.mergeDeep(fromJS(action.payload.entities.activity))
        default:
            return state
    }
}
