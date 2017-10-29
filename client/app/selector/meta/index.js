import { createSelector } from 'reselect'

const getComponentMeta = (state, key) =>
    state.getIn(['meta', 'app', 'components', key])

export default createSelector([getComponentMeta], meta => {
    return meta
})

export const currentUserIdSelector = state =>
    state.getIn(['meta', 'app', 'currentUserId'])

export const errorSelector = state => state.getIn(['meta', 'app', 'error'])
