// Tests for the calculator.
exports.config = {
//  directConnect: false,
//  'seleniumAddress': 'http://192.168.1.47:4444/wd/hub',

  framework: 'jasmine2',

  specs: [
    'spec.js',
//    'spec2.js'
  ],

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
    'goog:chromeOptions':{
        args: ["--headless", "--disable-gpu", "--window-size=800x600", "product-version"]
        },
    'version': '80.0',
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
