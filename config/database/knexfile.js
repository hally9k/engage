module.exports = {
    client: 'pg',
    connection: {
        host: 'db',
        port: '9966',
        user: 'postgres',
        password: '',
        database: 'engage',
        multipleStatements: true, // TODO: Make this only in local and stagong
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
}
