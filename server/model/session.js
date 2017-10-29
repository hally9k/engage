// @flow
import sql from '../connector/sql'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('session')
            .where('id', id)
            .first()
            .then(session => session)
    },
    all() {
        return sql
            .select()
            .from('session')
            .then(sessions => sessions)
    },
    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    },
    allForChildsActivity(childId, activityId) {
        return sql
            .select()
            .from('session')
            .where('child_id', childId)
            .where('activity_id', activityId)
            .then(sessions => {
                return sessions
            })
    }
}
