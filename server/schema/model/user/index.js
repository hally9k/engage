class User {
    constructor(sql) {
        this.sql = sql
    }

    one(id) {
        return this.sql
            .select()
            .from('user')
            .where('id', id)
            .first()
            .then(user => user)
    }

    all() {
        return this.sql.select().from('user').then(users => users)
    }

    oneOrAll(id) {
        return id ? [this.one(id)] : this.all()
    }

    children(id) {
        return this.sql
            .select()
            .from('user_child')
            .innerJoin('child', 'id', 'child_id')
            .where('user_id', id)
            .then(child => child)
    }
}

module.exports = User
