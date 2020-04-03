// Tests for the calculator.
exports.config = {
  directConnect: true,

  framework: 'jasmine2',

  specs: [
    ${bamboo_inject_var1}
  ],

  capabilities: {
    'browserName': 'chrome'
  },
};
