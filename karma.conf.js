module.exports = function karmaConfig (config) {
    config.set({
      frameworks: [
        'jasmine'
      ],
      reporters: [
        'progress',
        'coverage'
      ],
      files: [
        'app/tests.webpack.js'
      ],
      preprocessors: {
        'app/tests.webpack.js': ['webpack', 'sourcemap']
      },
      browsers: [
        'PhantomJS'
      ],
      singleRun: true,      
      coverageReporter: {
        dir: 'coverage/',
        reporters: [
          {type: 'text-summary'},
          {type: 'html'}
        ]
      },
      webpack: require('./webpack.config'),
      webpackMiddleware: {
        noInfo: 'errors-only'
      }
    });
  };