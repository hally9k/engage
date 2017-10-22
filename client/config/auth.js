import { env } from './index'

export default {
    development: 'http://45.55.138.227:8082',
    production: 'https://auth.engage'
}[env]

export const roles = { USER: 'USER', ADMIN: 'ADMIN' }
