import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'

export default class Activities extends Component {
    componentWillMount() {
        this.props.fetchingSubject(this.props.subjectId)
    }

    handleActivitySelection = id =>
        this.props.updateComponentState({
            selectedActivityId: id,
        })

    handleCloseModal = () => this.handleActivitySelection(null)

    renderActivities = () =>
        this.props.subject.activities.map(({ description, id }) =>
            <button
                key={`activity-${id}`}
                className="activity"
                onClick={() => this.handleActivitySelection(id)}
                onKeyPress={this.handleCloseModal}
            >
                <h5>
                    {description}
                </h5>
            </button>,
        )

    renderModal = (selectedActivityId, { description, hint }) =>
        <Modal
            isOpen={Boolean(selectedActivityId)}
            // onAfterOpen={afterOpenFn}
            onRequestClose={this.handleCloseModal}
            // closeTimeoutMS={n}
            // style={customStyle}
            contentLabel="Modal"
        >
            <div className="modal">
                <div className="modal-header">
                    <button
                        className="close-button"
                        onClick={this.handleCloseModal}
                        onKeyPress={this.handleCloseModal}
                    >
                        x
                    </button>
                </div>
                <div className="modal-body">
                    <h3>
                        {description}
                    </h3>
                    <p>
                        {hint}
                    </p>
                </div>
            </div>
        </Modal>

    render() {
        const { subject, meta } = this.props

        return subject
            ? <div className="activities">
                {meta && meta.selectedActivityId &&
                      this.renderModal(
                          meta.selectedActivityId,
                          subject.activities.find(
                              x => x.id === meta.selectedActivityId,
                          ),
                      )}
                {this.renderActivities()}
            </div>
            : null
    }
}

Activities.propTypes = {
    fetchingSubject: PropTypes.func.isRequired,
    meta: PropTypes.object,
    selectedActivityId: PropTypes.number,
    subject: PropTypes.object,
    subjectId: PropTypes.string.isRequired,
    updateComponentState: PropTypes.func.isRequired,
}
