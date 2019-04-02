// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      '@angular-devkit/build-angular/plugins/karma',
      'karma-coverage-istanbul-reporter'
    ],
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      dir: path.join(__dirname, '../coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      'report-config': {
        html: {
          subdir: 'html'
        }
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 80,
          lines: 80,
          branches: 50,
          functions: 80
        },
        each: {
          statements: 80,
          lines: 80,
          branches: 50,
          functions: 80
        }
      },
      verbose: false
    },
    client: {
      clearContext: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false
  });
};