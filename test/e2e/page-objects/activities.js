const TEN_SECONDS = 10000

let activitiesCommands = {
    activitiesLoad: function() {
        return this.waitForElementVisible('@activities', TEN_SECONDS)
    },
}

module.exports = {
    commands: [activitiesCommands],
    url: function() {
        return `${this.api.launchUrl}/activities`
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
