import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import getData from 'selector/data'
import { subjectSchema } from 'schema'

const getSubject = (state, id) =>
    id
        ? state.getIn(['data', 'subject', id.toString()])
        : state.getIn(['data', 'subject'])

const subjectSelector = createSelector(
    [getData, getSubject],
    (data, subject) =>
        subject ? denormalize(subject, subjectSchema, data).toJS() : null
)

export default subjectSelector
