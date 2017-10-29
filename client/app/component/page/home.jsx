import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Child from 'component/molecule/child'

import home from 'style/page/home.scss'

const css = {
    ...home
}

export default class Home extends Component {
    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        fetchingUser: PropTypes.func.isRequired
    }

    componentWillMount = () => {
        const { fetchingUser, currentUser } = this.props

        fetchingUser(currentUser.id)
    }

    render() {
        const { currentUser } = this.props

        return (
            <div className={css.home}>
                {currentUser &&
                    currentUser.children.map(child => (
                        <Child child={child} key={`child-${child.id}`} />
                    ))}
            </div>
        )
    }
}
