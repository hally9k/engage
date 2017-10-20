import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ago } from 'utility/time'

import conversation from '../../style/molecule/conversation.css'
import input from '../../style/atom/input.css'

const css = {
    ...conversation,
    ...input
}

const ONE_THOUSAND = 1000

export default class Conversation extends Component {
    static propTypes = {
        conversation: PropTypes.object,
        currentUserId: PropTypes.number.isRequired,
        sendingNewMessage: PropTypes.func.isRequired,
        subscribeToConversation: PropTypes.func.isRequired,
        unsubscribeFromConversation: PropTypes.func.isRequired
    }

    componentWillMount = () => {
        const {
            subscribeToConversation,
            conversation: { channel }
        } = this.props

        subscribeToConversation(channel)
    }

    componentWillReceiveProps = nextProps => {
        const {
            subscribeToConversation,
            unsubscribeFromConversation
        } = this.props

        if (this.props.conversation.id !== nextProps.conversation.id) {
            unsubscribeFromConversation(this.props.conversation.channel)
            subscribeToConversation(nextProps.conversation.channel)
        }
    }

    handleSendingNewMessage = () => {
        const {
            conversation: { id: conversationId, channel },
            currentUserId
        } = this.props

        const message = this.input.value

        this.props.sendingNewMessage(
            message,
            currentUserId,
            conversationId,
            channel
        )

        this.input.value = ''
    }

    renderMessageInput = () => (
        <div>
            <input
                ref={input => (this.input = input)}
                className={css['comment-input']}
            />
            <button onClick={this.handleSendingNewMessage}>Send</button>
        </div>
    )

    renderMessages = () =>
        this.props.conversation.messages.map((message, index) => (
            <div key={`message-${index}`} className="message">
                <h5>{message.user.firstName}</h5>
                <p>{message.content}</p>
                <p className={css['time-stamp']}>
                    {ago(parseFloat(message.createdAt) * ONE_THOUSAND)}
                </p>
            </div>
        ))

    renderConversation = channel => (
        <div className="conversation">
            <h2>{channel}</h2>
            {this.props.conversation.messages && this.renderMessages()}
            {this.renderMessageInput()}
        </div>
    )

    render() {
        const { conversation } = this.props

        return conversation
            ? this.renderConversation(conversation.channel)
            : null
    }
}
