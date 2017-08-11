import { createSelector } from 'reselect'

const getComponentMeta = (state, key) => {
    return state.meta.getIn(['components', key])
}

export default createSelector(
    [getComponentMeta],
    meta => (meta ? meta.toJS() : {})
)

export const currentUserIdSelector = state =>
    state.getIn(['meta', 'currentUser'])
