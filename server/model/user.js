// @flow

class User {
    sql: Knex$QueryBuilder

    constructor(sql: Knex$QueryBuilder) {
        this.sql = sql
    }

    one(id: Number) {
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

    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    }

    children(id: Number) {
        return this.sql
            .select()
            .from('user_child')
            .innerJoin('child', 'id', 'child_id')
            .where('user_id', id)
            .then(child => child)
    }
}

export default User
