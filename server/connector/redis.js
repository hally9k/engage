import redis from 'redis'

export default {
    sub: redis.createClient({ host: 'localhost' }),
    pub: redis.createClient({ host: 'localhost' }),
}
