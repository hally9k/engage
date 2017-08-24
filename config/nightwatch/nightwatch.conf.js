let seleniumServer = require('selenium-server')

module.exports = {
    src_folders: ['./e2e/tests'],
    output_folder: './e2e/reports',
    custom_commands_path: '',
    custom_assertions_path: '',
    page_objects_path: './e2e/page-objects',
    test_workers: false, // true will to run tests in parallel (http://nightwatchjs.org/guide#parallel-running)
    globals_path: '',

    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': 'config/nightwatch/drivers/chromedriver',
            'webdriver.gecko.driver': 'config/nightwatch/drivers/geckodriver',
        },
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:8080',
            selenium_host: '127.0.0.1',
            selenium_port: 4444,
            pathname: '/wd/hub',
            silent: true,
            screenshots: {
                enabled: false,
                path: '',
            },

            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    // "args" : ["headless", "no-sandbox", "disable-gpu"] //Enabling  this will start chrome in headless mode
                },
            },
        },
    },
}