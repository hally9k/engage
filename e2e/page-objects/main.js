const ONE_THOUSAND = 1000

let mainCommands = {
    mainLoad: function() {
        return this.waitForElementVisible('@activities', ONE_THOUSAND)
    }
}

module.exports = {
    commands: [mainCommands],
    url: function() {
        return this.api.launchUrl
    },
    elements: {
        activities: {
            selector: '.activities'
        },
        error: {
            selector: '.error'
        }
    }
}
