'use strict';

var _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    slash = require('slash')
;

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

        if (_.isArray(context.inFiles)) {
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
                            cfg.files.push(files);
                        }
                        // return the source file existence
                        return !joinedPathExists;
                    });
                } else {
                    cfg.files.push({
                        src: path.join(context.inDir, f),
                        dest: path.join(outDir,path.basename(f))
                    });
                }
            });
        }

        context.outFiles = cfg.files.map(function(f){
            return f.dest;
        });

        return cfg;
    }
};

var blockReplacement = function (block) {
    var clone = _.initial(_.rest(_.cloneDeep(block.raw))),
        result,
        dest
    ;

    if (block.conditionalStart) {
        clone = _.rest(clone);
    }
    if (block.conditionalEnd) {
        clone = _.initial(clone);
    }

    result = clone.join('\n').trim();

    if (_.isArray(block.src)) {
        block.src.forEach(function(src){
            dest = path.join(block.dest, path.basename(src));
            result = result.replace(src, slash(dest));
        });
    }
    return result;
};

module.exports = {
    step: step,
    blockReplacement: blockReplacement
};