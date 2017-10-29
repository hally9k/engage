import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'component/molecule/user-avatar'

import child from 'style/molecule/child.scss'

const css = {
    ...child
}

export default class Child extends Component {
    static propTypes = {
        child: PropTypes.object.isRequired
    }

    render() {
        const { child } = this.props

        return (
            <div className={css.child}>
                <div className={css.avatar}>
                    <UserAvatar user={child} size={'large'} />
                </div>
                <div className={css.details}>
                    <div>
                        <h1 className={css.name}>
                            {child.firstName} {child.lastName}
                        </h1>
                    </div>
                    <div className={css.age}>
                        <h1>{child.age} years</h1>
                    </div>
                </div>
            </div>
        )
    }
}
