import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Link from 'redux-first-router-link'
import Conversation from 'component/generic/conversation.container'

import chat from '../../style/page/chat.css'
import messenger from '../../style/organism/messenger.css'
import conversation from '../../style/molecule/conversation.css'

const css = {
    ...chat,
    ...messenger,
    ...conversation
}

export default class Messenger extends Component {
    static propTypes = {
        conversations: PropTypes.array,
        creatingConversation: PropTypes.func.isRequired,
        currentUserId: PropTypes.number.isRequired,
        fetchingConversation: PropTypes.func.isRequired,
        selectedConversation: PropTypes.object,
        updateMetaState: PropTypes.func.isRequired
    }

    componentWillMount = () => {
        const { fetchingConversation, currentUserId } = this.props

        fetchingConversation(currentUserId)
    }

    componentDidCatch = (error, errorInfo) => {
        console.log(error, errorInfo)
    }

    handleCreateConversation = () => {
        const { creatingConversation, currentUserId } = this.props

        creatingConversation(currentUserId, this.channelInput.value)
    }

    render() {
        const {
            conversations,
            selectedConversation,
            updateMetaState
        } = this.props

        return (
            <div>
                <button
                    onClick={() =>
                        updateMetaState({
                            currentUserId: 1
                        })}
                >
                    One
                </button>
                <button
                    onClick={() =>
                        updateMetaState({
                            currentUserId: 2
                        })}
                >
                    Two
                </button>
                <div className={css.messenger}>
                    <div className={css.channels}>
                        <label htmlFor="channel-input">
                            <input
                                name="channel-input"
                                ref={input => (this.channelInput = input)}
                            />
                            <button onClick={this.handleCreateConversation}>
                                +
                            </button>
                        </label>
                        {conversations &&
                            conversations.map(conversation => (
                                <div
                                    key={`channel-${conversation.slug}-${conversation.id}`}
                                >
                                    <Link to={`/chat/${conversation.slug}`}>
                                        {`#${conversation.slug}`}
                                    </Link>
                                </div>
                            ))}
                    </div>
                    <div className={css.conversation}>
                        {selectedConversation && (
                            <Conversation conversation={selectedConversation} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
