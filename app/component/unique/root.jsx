import React, { Component } from 'react'
import Activities from './activities.container'
import Messenger from './messenger.container'

export default class Root extends Component {
    render() {
        return (
            <div>
                <Activities subjectId="1" />
                <Messenger />
            </div>
        )
    }
}
