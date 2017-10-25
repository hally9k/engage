import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ago } from 'utility/time'
import { avatarUrl } from 'utility/image'

import conversation from '../../style/molecule/conversation.scss'
import input from '../../style/atom/input.scss'
import button from '../../style/atom/button.scss'

const css = {
    ...conversation,
    ...input,
    ...button
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
        <div className={css['message-input']}>
            <input ref={input => (this.input = input)} className={css.input} />
            <button
                onClick={this.handleSendingNewMessage}
                className={css.button}
            >
                Send
            </button>
        </div>
    )

    renderMessages = () =>
        this.props.conversation.messages.map((message, index) => (
            <div key={`message-${index}`} className={css.message}>
                <div className={css.body}>
                    <img
                        className={css.avatar}
                        src={`${avatarUrl}${message.user.avatar}`}
                        alt="user's avatar."
                    />
                    <p className={css.message}>{message.content}</p>
                </div>
                <div className={css.footer}>
                    <h5 className={css.name}>{message.user.firstName}</h5>
                    <p className={css['time-stamp']}>
                        {ago(parseFloat(message.createdAt) * ONE_THOUSAND)}
                    </p>
                </div>
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
