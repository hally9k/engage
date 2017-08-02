import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { subjectSchema } from 'schema'

const getSubject = (state, id) => {
    return state.data.getIn(['subject', id.toString()])
}

const subjectSelector = createSelector(
    [getData, getSubject],
    (data, subject) =>
        subject ? denormalize(subject, subjectSchema, data).toJS() : null
)

export default subjectSelector
