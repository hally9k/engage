
declare type Activity = {
    sql: Knex$QueryBuilder
}

declare type RedisConnector = {
    pub: any,
    sub: any
}
