import { normalize } from 'normalizr'
import { fromJS, Map, OrderedSet } from 'immutable'
import { subscribe, unsubscribe } from 'redux-graphql-subscriptions'

import graphql from 'utility/graphql'

import { processed, PROCESSED } from 'duck'
import { conversationSchema } from 'schema'
import conversationQuery from 'graphql/query/conversation'
import conversationMutation from 'graphql/mutation/conversation'
import conversationSubscription from 'graphql/subscription/conversation'
import {
    receivedNewMessage,
    receivedNewMessageWithErrors
} from 'duck/data/message'

// Actions
const CREATING_CONVERSATION = 'conversation/CREATING_CONVERSATION'
const FETCHING_CONVERSATION = 'conversation/FETCHING_CONVERSATION'
const RECEIVED_CONVERSATION = 'conversation/RECEIVED_CONVERSATION'
const ADD_MESSAGE = 'conversation/ADD_MESSAGE'

export const creatingConversation = (userId, channel) => ({
    type: CREATING_CONVERSATION,
    payload: {
        userId,
        channel
    }
})

export const fetchingConversation = payload => ({
    type: FETCHING_CONVERSATION,
    payload
})

export const receivedConversation = payload => ({
    type: RECEIVED_CONVERSATION,
    payload
})

export const addMessage = payload => ({
    type: ADD_MESSAGE,
    payload
})

export const subscribeToConversation = channel =>
    subscribe({ ...conversation, variables: { channel } })

export const unsubscribeFromConversation = channel => unsubscribe(channel)

// Subscriptions
const conversation = {
    query: conversationSubscription,
    success: receivedNewMessage,
    failure: receivedNewMessageWithErrors
}

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case ADD_MESSAGE:
            return state.updateIn(
                [action.payload.conversationId, 'messages'],
                messages =>
                    messages
                        .toOrderedSet()
                        .union(OrderedSet([action.payload.id]))
                        .toList()
            )
        case PROCESSED:
            return state.mergeDeep(fromJS(action.payload.entities.conversation))
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
                .then(conversation => [receivedConversation(conversation)])
        )

export const fetchingConversationEpic = action$ =>
    action$
        .ofType(FETCHING_CONVERSATION)
        .mergeMap(({ payload: userId }) =>
            graphql
                .request(conversationQuery, { userId })
                .then(conversation => [receivedConversation(conversation)])
        )

export const receivedConversationEpic = action$ =>
    action$
        .ofType(RECEIVED_CONVERSATION)
        .mergeMap(({ payload: { conversation } }) => {
            return [processed(normalize(conversation, [conversationSchema]))]
        })

export const epics = {
    creatingConversationEpic,
    fetchingConversationEpic,
    receivedConversationEpic
}
