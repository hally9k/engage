import config from '../config'

const { service: { postgres } } = config

export default {
    client: 'pg',
    connection: {
        host: postgres.host,
        port: postgres.port,
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
