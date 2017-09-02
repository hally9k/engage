import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { conversationSchema } from 'schema'

const getConversation = (state, id) =>
    id
        ? state.getIn(['data', 'conversation', id.toString()])
        : state.getIn(['data', 'conversation'])

const conversationSelector = createSelector(
    [getData, getConversation],
    (data, conversation) =>
        conversation
            ? denormalize(conversation, [conversationSchema], data)
                .toList()
                .sort((a, b) => a.createdAt > b.createdAt)
                .toJS()
            : null,
)

export default conversationSelector
