import { createLogger } from 'redux-logger'
const ignoreActions = []

export default createLogger({
    collapsed: true,
    predicate: (getState, action) =>
        !ignoreActions.find(ignore => action.type === ignore),
    stateTransformer: state => state.toJS()
})
