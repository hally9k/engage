import { GraphQLClient } from 'graphql-request'
import userQuery from 'graphql/user.graphql'
import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const client = new GraphQLClient('http://localhost:8001/graphql', {
    mode: 'cors'
})

export default class Root extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        client.request(userQuery).then(users => {
            this.setState({
                users
            })
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.users)}
            </div>
        )
    }
}

// Root.propTypes = {
//
// }
