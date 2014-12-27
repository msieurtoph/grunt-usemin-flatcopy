grunt-usemin-flatcopy
======================

[![Build Status](http://img.shields.io/travis/msieurtoph/grunt-usemin-flatcopy.svg)](https://travis-ci.org/msieurtoph/grunt-usemin-flatcopy) [![Code Climate](https://codeclimate.com/github/msieurtoph/grunt-usemin-flatcopy/badges/gpa.svg)](https://codeclimate.com/github/msieurtoph/grunt-usemin-flatcopy) [![Test Coverage](https://codeclimate.com/github/msieurtoph/grunt-usemin-flatcopy/badges/coverage.svg)](https://codeclimate.com/github/msieurtoph/grunt-usemin-flatcopy)

[![dependency Status](http://img.shields.io/david/msieurtoph/grunt-usemin-flatcopy.svg?style=flat)](https://david-dm.org/msieurtoph/grunt-usemin-flatcopy#info=dependencies) [![devDependency Status](http://img.shields.io/david/dev/msieurtoph/grunt-usemin-flatcopy.svg?style=flat)](https://david-dm.org/msieurtoph/grunt-usemin-flatcopy#info=devDependencies)

Export step and blockReplacement for usemin usage, to perform a copy of several files in a single flat folder

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins, especially [grunt-usemin][]. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-usemin-flatcopy --save-dev
```

[grunt]: http://gruntjs.com/
[grunt-usemin]: https://github.com/yeoman/grunt-usemin/
[Getting Started]: http://gruntjs.com/getting-started


### What does it do ?

It turns:
```html
<!-- build:flatcopyType my/unique/path/to -->
<script src="first/path/to/file1.js"></script>
<script src="second/path/to/file2.js"></script>
<script src="one/more/path/to/my/file3.js"></script>
<script src="another/path/to/my/file4.js"></script>
<!-- endbuild -->
```
into
```html
<script src="my/unique/path/to/file1.js"></script>
<script src="my/unique/path/to/file2.js"></script>
<script src="my/unique/path/to/file3.js"></script>
<script src="my/unique/path/to/file4.js"></script>
```

In Gruntfile.js:

```javascript
var flatcopy = require('./node_modules/grunt-usemin-flatcopy/grunt-usemin-flatcopy.js');

grunt.initConfig({
  useminPrepare: {
    html: 'path/to/index.html',
    options: {
      dest: 'destination/root/path/',
      flow: {
        html: {
          steps: {
            flatcopyType: [flatcopy.step]
            // copy the files to the single flat folder:
            // destination/root/path/my/unique/path/to
          },
          // do not remove  `post` property, even if empty
          post: []
        }
      }
    }
  },

  usemin: {
    html: 'path/to/index.html',
    options: {
      blockReplacements: {
        flatcopyType: flatcopy.blockReplacement, // <-- replacements in index.html
      }
    }
  }
});
```
