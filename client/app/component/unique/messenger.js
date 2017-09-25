import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Link from 'redux-first-router-link'
import Conversation from 'component/generic/conversation.container'

export default class Messenger extends Component {
    static propTypes = {
        conversations: PropTypes.array,
        creatingConversation: PropTypes.func.isRequired,
        currentUserId: PropTypes.number.isRequired,
        fetchingConversation: PropTypes.func.isRequired,
        selectedConversation: PropTypes.object,
    }

    componentWillMount = () => {
        const { fetchingConversation, currentUserId } = this.props

        fetchingConversation(currentUserId)
    }

    handleCreateConversation = () => {
        const { creatingConversation, currentUserId } = this.props

        creatingConversation(currentUserId, this.channelInput.value)
    }

    render() {
        const { conversations, selectedConversation } = this.props

        return (
            <div className="messenger">
                <div className="channels">
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
                <div className="conversation">
                    {selectedConversation && (
                        <Conversation conversation={selectedConversation} />
                    )}
                </div>
            </div>
        )
    }
}
