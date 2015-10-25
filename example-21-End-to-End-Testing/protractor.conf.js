/*
  El archivo de configuracion de protractor incluye los elementos de
  configuracion que Protractor necesita para ejecutar los test end-to-end.

  - Donde se ejecuta el server.
  - Donde esta el Selenium Webdriver donde se ejecutan los test
  - Que test deben ejecutarse
  - Sobre que navegadores se deben ejecutar los test
*/


exports.config = {
  // The address of a running Selenium server
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // The URL where the server we are testing is running
  baseUrl        : 'http://localhost:8000/',
  // Capabilities to be passed to the WebDriver instance
  capabilities   : {
    'browserName': 'chrome'
  },
  // Spec patterns are relative to the location of the
  // spec file. They may include glob patterns.
  specs          : ['*Spec*.js'],
  // Options to be passed to Jasmine-node
  jasmineNodeOpts: {
    showColors: true // Use colors in the command-line report
  }
};
