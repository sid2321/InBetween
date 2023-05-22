const { defineConfig } = require("cypress");
const puppeteer = require('puppeteer');
const { isFileExist, findFiles } = require('cy-verify-downloads');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');

module.exports = defineConfig({

  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  preserveOriginalScreenshot: true,
  watchForFileChanges:false,
  "retries": {
    // Configure retry attempts for `cypress run`
    // Default is 0
    "runMode": 0,
    // Configure retry attempts for `cypress open`
    // Default is 0
    "openMode": 0
  },
  e2e: {

    //baseUrl: 'http://localhost:8080/InBetween',
    "defaultCommandTimeout":10000,
    "taskTimeout":20000,
    "experimentalSessionAndOrigin":true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { isFileExist, findFiles });
      on('task', {downloadFile})
      //require('cypress-mochawesome-reporter/plugin')(on);
      return require('./cypress/plugins/index.js')(on, config)
    },
  },

});
