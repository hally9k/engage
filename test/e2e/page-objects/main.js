const TEN_SECONDS = 10000

let mainCommands = {
    mainLoad: function() {
        return this.waitForElementVisible('@homeTitle', TEN_SECONDS)
    },
}

module.exports = {
    commands: [mainCommands],
    url: function() {
        return this.api.launchUrl
    },
    elements: {
        homeTitle: {
            selector: '.home-title',
        },
        error: {
            selector: '.error',
        },
    },
}
