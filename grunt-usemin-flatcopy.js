'use strict';

var _ = require('lodash');
var path = require('path');

// exports step and blocReplacement variables,
// They will be used in the useminPrepare and usemin grunt plugins.

var step = {
    name:'copy',
    createConfig: function (context, block) {
        var cfg = {
            files: []
        };

        // warning : block.dest should be a directory
        var outDir = path.join(context.outDir || '', block.dest || '.','/');
        var outFiles = [];

        context.inFiles.forEach(function (f) {

            if (_.isArray(context.inDir)) {
                context.inDir.every(function (d) {
                    var joinedPath = path.join(d, f);
                    var joinedPathExists = fs.existsSync(joinedPath);
                    if (joinedPathExists) {
                        var files = {
                            src: [joinedPath],
                            dest: path.join(outDir,path.basename(f))
                        };
                        outFiles.push(files.dest);
                        cfg.files.push(files);
                    }
                    return !joinedPathExists;
                });
            } else {
                var files = {
                    src: [path.join(context.inDir, f)],
                    dest: path.join(outDir,path.basename(f))
                };
                outFiles.push(files.dest);
                cfg.files.push(files);
            }
        });

        context.outFiles = outFiles;
        return cfg;

    }
};

var blockReplacement = function (block) {
    var clone = _.initial(_.rest(_.cloneDeep(block.raw), block.conditionalStart ? 2 : 1 ), block.conditionalEnd ? 2 : 1 ),
        result = clone.join('\n').trim(),
        dest;
    block.src.forEach(function(src){
        dest = path.join(block.dest, path.basename(src));
        result = result.replace(src, dest.replace(/\\/g, '/'));
    });
    return result;
};

module.exports = {
    step: step,
    blockReplacement: blockReplacement
};