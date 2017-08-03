import { createSelector } from 'reselect'

const getComponentMeta = (state, key) => {
    return state.meta.getIn(['components', key])
}

export default createSelector(
    [getComponentMeta],
    meta => (meta ? meta.toJS() : {})
)
