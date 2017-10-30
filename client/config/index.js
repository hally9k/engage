/* eslint-disable no-undef */

const DEFAULT_PORT = 8081

export const env = process.env.BUILD_ENV || 'development'
export const port = process.env.PORT || DEFAULT_PORT
