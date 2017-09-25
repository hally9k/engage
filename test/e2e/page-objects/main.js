const TEN_SECONDS = 10000

let mainCommands = {
    mainLoad: function() {
        return this.waitForElementVisible('@main', TEN_SECONDS)
    },
}

module.exports = {
    commands: [mainCommands],
    url: function() {
        return this.api.launchUrl
    },
    elements: {
        main: {
            selector: '.main',
        },
        error: {
            selector: '.error',
        },
    },
}
