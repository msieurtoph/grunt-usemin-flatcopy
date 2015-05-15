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
        'Gruntfile.js',
        'grunt-usemin-flatcopy.js',
        'spec/**/*.js'
      ]
    },

    watch: {
      js: {
        files: [
          'Gruntfile.js',
          'grunt-usemin-flatcopy.js',
          'spec/**/*.spec.js'
        ],
        tasks: [
          'newer:jshint:all',
          'jasmine_nodejs'
        ],
      }
    },

    'jasmine_node': {
      all: ['spec/'],
      coverage: {
        options : {
          failTask: false,
          branches : 100 ,
          functions: 100,
          statements:100,
          lines:100
        }
      }
    },

    'jasmine_nodejs': {
      all: {
        specs: [
          'spec/**'
        ]
      }
    }

  });

  grunt.registerTask('default', [
    'jshint:all',
    'test'
  ]);

  grunt.registerTask('test', [
    'jasmine_nodejs'
  ]);


};