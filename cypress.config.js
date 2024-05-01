const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: false, // Disable video recording

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
