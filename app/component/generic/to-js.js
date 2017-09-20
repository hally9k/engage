import React from 'react'
import { Iterable } from 'immutable'
import { getDisplayName } from 'utility/component'

const ToJS = WrappedComponent =>
    class ToJSWrapper extends React.Component {
        constructor(props) {
            super(props)

            this.newProps = this.updateNewProps({}, props)
        }

        static displayName = `ToJSWrapper(${getDisplayName(WrappedComponent)})`

        updateNewProps = (props, nextProps) =>
            Object.entries(nextProps).reduce((newProps, entry) => {
                if (props[entry[0]] === entry[1]) {
                    newProps[entry[0]] = props[entry[0]]
                } else {
                    newProps[entry[0]] = Iterable.isIterable(entry[1])
                        ? entry[1].toJS()
                        : entry[1]
                }

                return newProps
            }, {})

        componentWillReceiveProps = nextProps => {
            this.newProps = this.updateNewProps(this.newProps, nextProps)
        }

        render = () => <WrappedComponent {...this.newProps} />
    }

export default ToJS
