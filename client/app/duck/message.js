import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import { messageSchema } from 'schema'
import messageMutation from 'graphql/mutation/message'
import { addMessage } from 'duck/conversation'
import { fromJS, Map } from 'immutable'

// Actions
const SENDING_NEW_MESSAGE = 'message/SENDING_NEW_MESSAGE'
const RECEIVED_NEW_MESSAGE = 'message/RECEIVED_NEW_MESSAGE'
const RECEIVED_NEW_MESSAGE_WITH_ERRORS =
    'message/RECEIVED_NEW_MESSAGE_WITH_ERRORS'

// Action Creators
export const sendingNewMessage = (
    content,
    userId,
    conversationId,
    channel,
) => ({
    type: SENDING_NEW_MESSAGE,
    payload: {
        content,
        userId,
        conversationId,
        channel,
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

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.mergeDeep(fromJS(action.payload.entities.message))
        default:
            return state
    }
}

// Epics
export const sendingNewMessageEpic = action$ =>
    action$
        .ofType(SENDING_NEW_MESSAGE)
        .mergeMap(({ payload: { content, userId, conversationId, channel } }) =>
            graphql
                .request(messageMutation, {
                    content,
                    userId,
                    conversationId,
                    channel,
                })
                .then(res => {
                    return [
                        receivedNewMessage({
                            data: { conversation: res.message },
                        }),
                    ]
                }),
        )

export const receivedNewMessageEpic = action$ =>
    action$
        .ofType(RECEIVED_NEW_MESSAGE)
        .mergeMap(({ payload: { data: { conversation: message } } }) => {
            return [
                processed(normalize(message, messageSchema)),
                addMessage(message),
            ]
        })

export const epics = {
    sendingNewMessageEpic,
    receivedNewMessageEpic,
}
