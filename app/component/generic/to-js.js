import React from 'react'
import { Iterable } from 'immutable'
import { getDisplayName } from 'utility/component'

const ToJS = WrappedComponent =>
    class ToJSWrapper extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                newProps: {},
                processedProps: new WeakMap(),
            }
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.newProps = this.updateNewProps({}, props)
        }

        static displayName = `ToJSWrapper(${getDisplayName(WrappedComponent)})`

        updateNewProps = (props, nextProps) =>
            Object.entries(nextProps).reduce((newProps, [key, value]) => {
                if (this.propsHaventChanged(props[key], value)) {
                    newProps[key] = props[key]
                } else {
                    newProps[key] = this.toJSIfIterable(value)
                }

                return newProps
            }, {})

        propsHaventChanged = (oldProp, newProp) => oldProp === newProp

        toJSIfIterable = value => {
            let plainJS

            if (Iterable.isIterable(value)) {
                const previouslyProcessedProp = this.state.processedProps.get(
                    value,
                )

                if (previouslyProcessedProp) {
                    plainJS = previouslyProcessedProp
                } else {
                    plainJS = value.toJS()
                    this.state.processedProps.set(value, plainJS)
                }
            } else {
                plainJS = value
            }

            return plainJS
        }

        componentWillReceiveProps = nextProps => {
            this.setState({
                newProps: this.updateNewProps(this.state.newProps, nextProps),
            })
        }

        render = () => <WrappedComponent {...this.state.newProps} />
    }

export default ToJS
