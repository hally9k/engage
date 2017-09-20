import React from 'react'
import { getDisplayName } from 'utility/component'

const RequiredProps = (WrappedComponent, LoadingComponent) => {
    return class RequiredPropsWrapper extends React.Component {
        constructor(props) {
            super(props)
        }

        static propTypes = WrappedComponent.propTypes

        static displayName = `RequiredPropsWrapper(${getDisplayName(
            WrappedComponent,
        )})`

        requiredPropsMissing = () => {
            return (
                WrappedComponent.propTypes &&
                Object.keys(this.props)
                    .filter(propKey => {
                        return (
                            Object.keys(WrappedComponent.propTypes).includes(
                                propKey,
                            ) &&
                            Boolean(
                                !WrappedComponent.propTypes[propKey].isRequired,
                            )
                        )
                    })
                    .reduce(
                        (current, propKey) =>
                            current ||
                            [undefined, null].includes(this.props[propKey]),
                        false,
                    )
            )
        }

        render = () =>
            this.requiredPropsMissing() ? (
                <LoadingComponent />
            ) : (
                <WrappedComponent {...this.props} />
            )
    }
}

export default RequiredProps
