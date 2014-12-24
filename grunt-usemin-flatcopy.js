'use strict';

var _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    slash = require('slash')
;

function createFileObject(file, inDir, outDir, cfgFiles) {
    var joinedPath = path.join(inDir, file);
    var joinedPathExists = fs.existsSync(joinedPath);
    if (joinedPathExists) {
        var files = {
            src: [joinedPath],
            dest: path.join(outDir,path.basename(file))
        };
        console.log();
        cfgFiles.push(files);
    }
    // return the source file existence
    return joinedPathExists;
}

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
                        return !createFileObject(f, d, outDir, cfg.files);
                    });
                } else {
                    createFileObject(f, context.inDir, outDir, cfg.files);
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
    var clone = _.initial(_.rest(_.cloneDeep(block.raw), block.conditionalStart ? 2 : 1 ), block.conditionalEnd ? 2 : 1 ),
        result = clone.join('\n').trim(),
        dest
    ;
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