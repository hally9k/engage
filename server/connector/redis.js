import redis from 'redis'

export default {
    sub: redis.createClient({ host: 'redis' }),
    pub: redis.createClient({ host: 'redis' }),
}
