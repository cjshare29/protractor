var { SpecReporter } = require('jasmine-spec-reporter');

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var jasmineReporters = require('jasmine-reporters');

var reportsDirectory = './reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
var detailsReportDirectory = reportsDirectory + '/detailReport';

var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
    dest: detailsReportDirectory,
    filename: 'E2ETestingReport.html',
    reportTitle: "E2E Testing Report",
    showSummary: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
});

var JSONReporter = require('jasmine-bamboo-reporter');
var fs = require('fs');

// Tests for the calculator.
exports.config = {
  directConnect: false,
//  'seleniumAddress': 'http://192.168.1.47:4444/wd/hub',

  specs: [
    'spec.js',
//    'spec2.js'
  ],

  framework: 'jasmine2',

   beforeLaunch: function () {
      return new Promise(function (resolve) {
          ScreenshotAndStackReporter.beforeLaunch(resolve);
      });

        if (fs.existsSync('jasmine-results.json.lock')) {
              fs.unlinkSync('jasmine-results.json.lock');
            }
            if (fs.existsSync('jasmine-results.json')) {
              fs.unlink('jasmine-results.json');
            }
  },

  onPrepare: function () {

      jasmine.getEnv().addReporter(new JSONReporter({
          file: 'jasmine-results.json', // by default it writes to jasmine.json
          beautify: true,
          indentationLevel: 4 // used if beautify === true
      }));

      jasmine.getEnv().addReporter(new SpecReporter({
              displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
              displaySuccessesSummary: false, // display summary of all successes after execution
              displayFailuresSummary: true,   // display summary of all failures after execution
              displayPendingSummary: true,    // display summary of all pending specs after execution
              displaySuccessfulSpec: true,    // display each successful spec
              displayFailedSpec: true,        // display each failed spec
              displayPendingSpec: false,      // display each pending spec
              displaySpecDuration: false,     // display each spec duration
              displaySuiteNumber: false,      // display each suite number (hierarchical)
              colors: {
                  success: 'green',
                  failure: 'red',
                  pending: 'yellow'
              },
              prefixes: {
                  success: '✓ ',
                  failure: '✗ ',
                  pending: '* '
              },
              customProcessors: []
          }));



         jasmine.getEnv().addReporter(ScreenshotAndStackReporter);
         // xml report generated for dashboard
         jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
             consolidateAll: true,
             savePath: reportsDirectory + '/xml',
             filePrefix: 'xmlOutput'
         }));

//         var fs = require('fs-extra');
//         if (!fs.existsSync(dashboardReportDirectory)) {
//             fs.mkdirSync(dashboardReportDirectory);
//         };

         jasmine.getEnv().addReporter({
             specDone: function (result) {
                 if (result.status == 'failed') {
                     browser.getCapabilities().then(function (caps) {
                         var browserName = caps.get('browserName');

                         browser.takeScreenshot().then(function (png) {
                             var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
                             stream.write(new Buffer(png, 'base64'));
                             stream.end();
                         });
                     });
                 }
             }
         });

     },

     onComplete: function () {
         var browserName, browserVersion;
         var capsPromise = browser.getCapabilities();

         capsPromise.then(function (caps) {
             browserName = caps.get('browserName');
             browserVersion = caps.get('version');
             platform = caps.get('platform');

             var HTMLReport = require('protractor-html-reporter-2');
             testConfig = {
                 reportTitle: 'Protractor Test Execution Report',
                 outputPath: dashboardReportDirectory,
                 outputFilename: 'index',
                 screenshotPath: './',
                 testBrowser: browserName,
                 browserVersion: browserVersion,
                 modifiedSuiteName: false,
                 screenshotsOnlyOnFailure: true,
                 testPlatform: platform
             };
             new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
         });
     },

//    capabilities: {
//      browserName: 'chrome',
//    'goog:chromeOptions':{
//        args: ["--headless", "--disable-gpu", "--window-size=800x600", "product-version"]
//        },
//    'maxInstances': '2',
//    shardTestFiles: '2',
//    },

  multiCapabilities:[

    {
    'browserName': 'chrome',
    'browserVersion': '81.0.4044.92',
//    'goog:chromeOptions':{
//        args: ["--headless", "--disable-gpu", "--window-size=800x600", "product-version"]
//        },
//    'browserVersion': '80.0',
    'maxInstances': '2',
    shardTestFiles: '2',
    },
    {
    'browserName': 'chrome',
    'goog:chromeOptions':{
        args: ["--headless", "--disable-gpu", "--window-size=800x600", "product-version"]
        },
    'maxInstances': '2',
    shardTestFiles: '2',
    }],


};
