import { createSelector } from 'reselect'

export default createSelector([state => state.get('meta')], meta => {
    return meta.get('fetching')
}
)
