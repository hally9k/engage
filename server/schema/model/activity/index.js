class Activity {
    constructor(sql) {
        this.sql = sql
    }

    one(id) {
        return this.sql
            .select()
            .from('activity')
            .where('id', id)
            .first()
            .then(activity => activity)
    }

    all() {
        return this.sql.select().from('activity').then(activities => activities)
    }

    oneOrAll(id) {
        return id ? [this.one(id)] : this.all()
    }
}

module.exports = Activity
