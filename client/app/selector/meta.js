import { createSelector } from 'reselect'

const getComponentMeta = (state, key) =>
    state.getIn(['meta', 'components', key])

export default createSelector([getComponentMeta], meta => {
    return meta
})

export const currentUserIdSelector = state =>
    state.getIn(['meta', 'currentUserId'])

export const errorSelector = state => state.getIn(['meta', 'error'])
