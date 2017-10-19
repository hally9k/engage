// @flow
import * as React from 'react'
import FallbackComponent from './fallback'

type Props = {
    children: React.Node,
    fallback: React.Node
}

type State = {
    error: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
    props: Props
    state: State

    setState: Function

    static defaultProps = {
        fallback: <FallbackComponent />
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            error: false
        }
    }

    componentDidCatch() {
        this.setState({ error: true })
    }

    render(): React.Node {
        return this.state.error ? this.props.fallback : this.props.children
    }
}

const errorBoundary: Function = (
    Component: *,
    Fallback: React.Node
): Function => (props: *): React.Node => {
    const errorBoundary: React.Node = (
        <ErrorBoundary fallback={Fallback}>
            <Component {...props} />
        </ErrorBoundary>
    )

    return errorBoundary
}

export default errorBoundary
