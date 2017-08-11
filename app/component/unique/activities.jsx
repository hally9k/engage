import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Activities extends Component {
    componentWillMount() {
        this.props.fetchingSubject(this.props.subjectId)
    }

    renderActivities = () =>
        <div className="activities">
            {this.props.subject.activities.map((activity, index) =>
                <div key={`activity-${index}`} className="activity">
                    <h5>
                        {activity.description}
                    </h5>
                </div>
            )}
        </div>

    render() {
        const { subject } = this.props

        return subject ? this.renderActivities() : null
    }
}

Activities.propTypes = {
    fetchingSubject: PropTypes.func.isRequired,
    subject: PropTypes.object,
    subjectId: PropTypes.string.isRequired
}
