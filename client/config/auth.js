import { env } from './index'

export default {
    development: 'http://45.55.138.227:8082',
    production: 'http://engage.smith-stevens.com:80802'
}[env]

export const roles = { USER: 'USER', ADMIN: 'ADMIN' }
