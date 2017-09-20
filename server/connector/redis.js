import config from '../../config'
import redis from 'redis'

const { service: { redis: redisConfig } } = config

export default {
    sub: redis.createClient(redisConfig),
    pub: redis.createClient(redisConfig),
}
