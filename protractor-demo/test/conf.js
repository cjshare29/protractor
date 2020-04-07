// Tests for the calculator.
exports.config = {
//  directConnect: false,
  'seleniumAddress': 'http://192.168.1.47:4444/wd/hub',

  framework: 'jasmine2',

  specs: [
    'spec.js',
    'spec2.js'
  ],

    capabilities: {

      browserName: 'chrome',
//      var opt = new chromeOptions(),
//      ChromeDriver driver = new ChromeDriver("/Downloads/chromedriver-3");

      'goog:chromeOptions':{
      args: ["--headless", "--disable-gpu", "--window-size=800x600"]
      },
      shardTestFiles: 2,

      maxInstances: '2',
    },


//  multiCapabilities: [
//    {
//    browserName: 'chrome',
//    },{
//    browserNa/me: 'firefox',
//    },
////    maxInstances: '2'
//  ],
};
