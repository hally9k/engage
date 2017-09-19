import React, { Component } from 'react'
import Activities from './activities.container'
import Comments from './comments.container'

export default class Root extends Component {
    render() {
        return (
            <div>
                <Activities subjectId="1" />
                <Comments />
            </div>
        )
    }
}
