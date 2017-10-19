import * as React from 'react'

export default class Fallback extends React.Component {
    render() {
        return (
            <div className="fallback">
                <div className="info">
                    <img
                        className="icon"
                        src="/icons/warning.svg"
                        alt="An error has occurred."
                    />
                    <p className="message">
                        An error has occurred, please click{' '}
                        <a href="https://support.engage.com">here</a> to contact
                        support.
                    </p>
                </div>
            </div>
        )
    }
}
