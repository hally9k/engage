// @flow

class Activity {
    sql: Knex$QueryBuilder<Activity>

    constructor(sql: Knex$QueryBuilder<Activity>) {
        this.sql = sql
    }

    one(id: Number) {
        return this.sql
            .select()
            .from('activity')
            .where('id', id)
            .first()
            .then(activity => activity)
    }

    all() {
        return this.sql
            .select()
            .from('activity')
            .then(activities => activities)
    }

    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    }
}

export default Activity
