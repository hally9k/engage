// Actions
export const FETCHING = 'user/FETCHING'
export const RECEIVED = 'user/RECEIVED'

export const fetchingUser = payload => ({ type: FETCHING, payload })
export const receivedUser = payload => ({ type: RECEIVED, payload })
