import { createSelector } from 'reselect'

export default createSelector(
    [state => state.get('location')],
    location => location,
)
