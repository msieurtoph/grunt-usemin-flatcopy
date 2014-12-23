grunt-usemin-flatcopy
======================

Export step and blockReplacement for usemin usage, to perform a copy of several files in a single flat folder

Repo construction is in progress ... please come back in few days.

However, the main file is already available, feel free to download and use it.

### Usage

In Gruntfile.js:

```javascript

module.exports = function (grunt) {

  var flatcopy = require('./path/to/grunt-usemin-flatcopy.js');

  grunt.initConfig({
    useminPrepare: {
      html: 'path/to/index.html',
      options: {
        dest: 'destination/root/path/',
        flow: {
          html: {
            steps: {
              vendor: [flatcopy.step]
            },
            // do not remove  `post` property, even if empty
            post: []
          }
        }
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/index.html'],
      options: {
        blockReplacements: {
            vendor: flatcopy.blockReplacement,
        }}
    },


  }):

};
```

And in the index.html:

```html
    ...

    <!-- build:vendor(.) scripts/vendor -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="node_modules/angular-sanitize/angular-sanitize.min.js"></script>
    <!-- endbuild -->

    ...

```

Finally you will get:

- the 3 files in the same flat folder: `destination/root/path/scripts/vendor/`

- the 3 lines in the index.html have been updated:

```html
    <!-- build:vendor(.) scripts/vendor -->
    <script src="scripts/vendor/angular.min.js"></script>
    <script src="scripts/vendor/ui-bootstrap-tpls.min.js"></script>
    <script src="scripts/vendor/angular-sanitize.min.js"></script>
    <!-- endbuild -->
```

Enjoy!