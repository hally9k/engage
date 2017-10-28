import { combineReducers } from 'redux-immutablejs'

import child, { epics as childEpics } from 'duck/data/child'
import conversation, {
    epics as conversationEpics
} from 'duck/data/conversation'
import message, { epics as messageEpics } from 'duck/data/message'
import subject, { epics as subjectEpics } from 'duck/data/subject'
import user, { epics as userEpics } from 'duck/data/user'

// Root Data Reducer
export default combineReducers({
    child,
    conversation,
    message,
    subject,
    user
})

// Root Data Epic
export const epics = {
    ...childEpics,
    ...conversationEpics,
    ...messageEpics,
    ...subjectEpics,
    ...userEpics
}
