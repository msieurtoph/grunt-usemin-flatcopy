'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '*.js',
        'spec/**/*.js'
      ]
    },

    watch: {
      js: {
        files: [
          'Gruntfile.js',
          'grunt-usemin-flatcopy.js',
          'spec/grunt-usemin-flatcopy.spec.js'
        ],
        tasks: [
          'test'
        ],
      }
    },

    'jasmine_node': {
      all: {
        options: {
          showColors: true,
          useHelpers: true,
          coverage: {
            report: ['lcov'],
          },
          forceExit: true,
          match: '.',
          matchAll: false,
          specFolders: ['spec'],
          extensions: 'js',
          specNameMatcher: 'spec',
          captureExceptions: true,
        },
        src: ['grunt-usemin-flatcopy.js']
      }
    }

  });

  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', [
    'jshint:all',
    'jasmine_node',
  ]);


};