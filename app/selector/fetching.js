import { createSelector } from 'reselect'

export default createSelector([state => state.meta], meta =>
    meta.get('fetching')
)
