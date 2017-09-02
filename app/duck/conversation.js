import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import { conversationSchema } from 'schema'
import conversationQuery from 'graphql/query/conversation'
import conversationMutation from 'graphql/mutation/conversation'
import conversationSubscription from 'graphql/subscription/conversation'
import { fromJS, Map } from 'immutable'
import { subscribe, unsubscribe } from 'redux-graphql-subscriptions'

// Actions
const CREATING_CONVERSATION = 'conversation/CREATING_CONVERSATION'
const FETCHING_CONVERSATION = 'conversation/FETCHING_CONVERSATION'
const RECEIVED_CONVERSATION = 'conversation/RECEIVED_CONVERSATION'
const SENDING_NEW_MESSAGE = 'conversation/SENDING_NEW_MESSAGE'
const RECEIVED_NEW_MESSAGE = 'conversation/RECEIVED_NEW_MESSAGE'
const RECEIVED_NEW_MESSAGE_WITH_ERRORS =
    'conversation/RECEIVED_NEW_MESSAGE_WITH_ERRORS'

export const creatingConversation = (userId, channel) => ({
    type: CREATING_CONVERSATION,
    payload: {
        userId,
        channel,
    },
})

export const fetchingConversation = payload => ({
    type: FETCHING_CONVERSATION,
    payload,
})

export const receivedConversation = payload => ({
    type: RECEIVED_CONVERSATION,
    payload,
})

export const sendingNewMessage = (message, userId) => ({
    type: SENDING_NEW_MESSAGE,
    payload: {
        message,
        userId,
    },
})

export const receivedNewMessage = payload => ({
    type: RECEIVED_NEW_MESSAGE,
    payload,
})

export const receivedNewMessageWithErrors = payload => ({
    type: RECEIVED_NEW_MESSAGE_WITH_ERRORS,
    payload,
})

export const subscribeToConversation = channel =>
    subscribe({ id: channel, ...conversation })

export const unsubscribeFromConversation = channel => unsubscribe(channel)

// Subscriptions
const conversation = {
    query: conversationSubscription,
    success: receivedNewMessage,
    failure: receivedNewMessageWithErrors,
}

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.merge(fromJS(action.payload.entities.conversation))
        default:
            return state
    }
}

// Epics
export const creatingConversationEpic = action$ =>
    action$
        .ofType(CREATING_CONVERSATION)
        .mergeMap(({ payload: { userId, channel } }) =>
            graphql
                .request(conversationMutation, { userId, channel })
                .then(conversation => [receivedConversation(conversation)]),
        )

export const fetchingConversationEpic = action$ =>
    action$
        .ofType(FETCHING_CONVERSATION)
        .mergeMap(({ payload: userId }) =>
            graphql
                .request(conversationQuery, { userId })
                .then(conversation => [receivedConversation(conversation)]),
        )

export const receivedConversationEpic = action$ =>
    action$
        .ofType(RECEIVED_CONVERSATION)
        .mergeMap(({ payload: { conversation } }) => {
            return [processed(normalize(conversation, [conversationSchema]))]
        })

export const sendingNewMessageEpic = action$ =>
    action$
        .ofType(SENDING_NEW_MESSAGE)
        .mergeMap(({ payload: { message, userId } }) =>
            graphql
                .request(conversationMutation, { message, userId })
                .then(({ message }) => [receivedNewMessage(message)]),
        )

export const receivedNewMessageEpic = action$ =>
    action$
        .ofType(RECEIVED_NEW_MESSAGE)
        .mergeMap(({ payload: message }) => [
            processed(normalize(message, conversationSchema)),
        ])

export const epics = {
    creatingConversationEpic,
    fetchingConversationEpic,
    receivedConversationEpic,
    sendingNewMessageEpic,
    receivedNewMessageEpic,
}
