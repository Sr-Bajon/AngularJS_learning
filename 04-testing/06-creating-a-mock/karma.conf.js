module.exports = function (config) {
  config.set({
    basePath  : '',
    frameworks: ['jasmine'],
    files     : [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      '*.js'
    ],
    exclude   : [],
    port      : 8080,
    logLevel  : config.LOG_INFO,
    autoWatch : true,
    browsers  : ['Chrome'],
    singleRun : false
  });
};
