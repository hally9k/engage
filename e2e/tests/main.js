module.exports = {
    'Main Page Initial Render': function(browser) {
        let main = browser.page.main()

        main.navigate().mainLoad()

        browser.end()
    },
}
