const env = process.env.NODE_ENV || 'development'

export default {
    development: {
        service: {
            redis: {
                host: 'redis',
                port: 6379,
            },
            postgres: {
                host: 'db',
                port: 5432,
            },
        },
    },
    staging: {
        service: {
            redis: {
                host: 'redis',
                port: 6379,
            },
            postgres: {
                host: 'db',
                port: 5432,
            },
        },
    },
    production: {},
}[env]
