// let seleniumServer = require('selenium-server')

module.exports = {
    src_folders: ['./e2e/tests'],
    output_folder: './e2e/reports',
    custom_commands_path: '',
    custom_assertions_path: '',
    page_objects_path: './e2e/page-objects',
    test_workers: false, // true will to run tests in parallel (http://nightwatchjs.org/guide#parallel-running)
    globals_path: '',

    selenium: {
        start_process: false,
        host: 'hub-cloud.browserstack.com',
        port: 80,
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:8000',
            silent: true,
            screenshots: {
                enabled: false,
                path: '',
            },
            globals: {
                waitForConditionTimeout: 10000,
            },
            desiredCapabilities: {
                build: `build-${process.env.BUILDKITE_BUILD_NUMBER || 'local'}`,
                'browserstack.user':
                    process.env.BROWSERSTACK_USERNAME ||
                    'BROWSERSTACK_USERNAME',
                'browserstack.key':
                    process.env.BROWSERSTACK_ACCESS_KEY ||
                    'BROWSERSTACK_ACCESS_KEY',
                'browserstack.debug': true,
                browser: 'chrome',
                name: 'Engage',
                platform: 'ANY',
            },
        },
        // local: {
        //     launch_url: 'http://localhost:8000',
        //     selenium_host: '127.0.0.1',
        //     selenium_port: 4444,
        //     pathname: '/wd/hub',
        //     silent: true,
        //     screenshots: {
        //         enabled: false,
        //         path: '',
        //     },
        //
        //     desiredCapabilities: {
        //         browserName: 'chrome',
        //         chromeOptions: {
        //             // "args" : ["headless", "no-sandbox", "disable-gpu"] //Enabling  this will start chrome in headless mode
        //         },
        //     },
        // },
    },
}
