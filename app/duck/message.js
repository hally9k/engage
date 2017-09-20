import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import { messageSchema } from 'schema'
import messageMutation from 'graphql/mutation/message'
import { fromJS, Map } from 'immutable'

// Actions
const SENDING_NEW_MESSAGE = 'conversation/SENDING_NEW_MESSAGE'
const RECEIVED_NEW_MESSAGE = 'conversation/RECEIVED_NEW_MESSAGE'
const RECEIVED_NEW_MESSAGE_WITH_ERRORS =
    'conversation/RECEIVED_NEW_MESSAGE_WITH_ERRORS'

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
            return state.merge(fromJS(action.payload.entities.message))
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
                .then(message => {
                    return [receivedNewMessage(message)]
                }),
        )

export const receivedNewMessageEpic = action$ =>
    action$
        .ofType(RECEIVED_NEW_MESSAGE)
        .mergeMap(({ payload: message }) => {
            return [processed(normalize(message, messageSchema))]
        })

export const epics = {
    sendingNewMessageEpic,
    receivedNewMessageEpic,
}
