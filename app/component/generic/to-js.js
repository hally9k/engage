import React from 'react'
import { Iterable } from 'immutable'

const ToJS = WrappedComponent =>
    class ImmutableWrapper extends React.Component {
        constructor(props) {
            super(props)

            this.newProps = this.updateNewProps(this.props)
        }

        updateNewProps = (currentProps) =>
            Object.entries(currentProps).reduce((newProps, entry) => {
                newProps[entry[0]] = Iterable.isIterable(entry[1]) ? entry[1].toJS() : entry[1]

                return newProps
            }, {})

        componentWillReceiveProps = (nextProps) => {
            this.newProps = this.updateNewProps(nextProps)
        }

        render = () => <WrappedComponent {...this.newProps} />
    }

export default ToJS
