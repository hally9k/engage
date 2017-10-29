import React from 'react'

const RequiredProps = (WrappedComponent, LoadingComponent) => {
    return class RequiredPropsWrapper extends React.Component {
        static displayName = `RequiredPropsWrapper(${getDisplayName(
            WrappedComponent
        )})`

        constructor(props) {
            super(props)
        }

        requiredPropsMissing = () => {
            return (
                WrappedComponent.propTypes &&
                Object.keys(this.props)
                    .filter(propKey => {
                        return (
                            Object.keys(WrappedComponent.propTypes).includes(
                                propKey
                            ) &&
                            Boolean(
                                !WrappedComponent.propTypes[propKey].isRequired
                            )
                        )
                    })
                    .reduce(
                        (current, propKey) =>
                            current ||
                            [undefined, null].includes(this.props[propKey]),
                        false
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

const getDisplayName = Component =>
    Component.displayName || Component.name || 'Component'

export default RequiredProps
