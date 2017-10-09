module.exports = {
    'Activities Page Initial Render': function(browser) {
        let activities = browser.page.activities()

        activities.navigate().activitiesLoad()

        browser.end()
    },
}
