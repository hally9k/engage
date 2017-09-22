import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import getLocation from 'selector/location'
import { conversationSchema } from 'schema'

const getConversation = (state, id) =>
    id
        ? state.getIn(['data', 'conversation', id.toString()])
        : state.getIn(['data', 'conversation'])

export const conversationSelector = createSelector(
    [getData, getConversation],
    (data, conversation) =>
        conversation
            ? denormalize(conversation, [conversationSchema], data).toList()
            : null,
)

export const selectedConversationSelector = createSelector(
    [getData, getConversation, getLocation],
    (data, conversations, location) => {
        const payload = location.get('payload')

        if (!payload) {
            return null
        }
        const channel = payload.get('channel')

        const conversation = conversations.find(x => x.get('slug') === channel)

        return conversation
            ? denormalize(conversation, conversationSchema, data)
            : null
    },
)
