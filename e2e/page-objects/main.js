const TEN_SECONDS = 10000

let mainCommands = {
    mainLoad: function() {
        return this.waitForElementVisible('@activities', TEN_SECONDS)
    },
}

module.exports = {
    commands: [mainCommands],
    url: function() {
        return this.api.launchUrl
    },
    elements: {
        activities: {
            selector: '.activities',
        },
        error: {
            selector: '.error',
        },
    },
}
