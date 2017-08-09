const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath)
}

module.exports = {
    appRoot: resolveApp('.'),
    appBuild: resolveApp('public'),
    appHtmlTemplate: resolveApp('static/index.html'),
    appIndexJs: resolveApp('app/index.js'),
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('static'),
    appSrc: resolveApp('app')
}
