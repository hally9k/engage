module.exports = {
    src_folders: ['./test/e2e/tests'],
    output_folder: './test/e2e/reports',
    custom_commands_path: '',
    custom_assertions_path: '',
    page_objects_path: './test/e2e/page-objects',
    test_workers: false,
    globals_path: '',

    test_settings: {
        default: {
            launch_url: 'http://client:8080',
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            screenshots: {
                enabled: true,
                path: '/selenium/screenshots',
            },
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
    },
}
