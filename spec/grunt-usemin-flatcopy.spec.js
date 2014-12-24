'use strict';

var flat = require('../grunt-usemin-flatcopy.js'),
    path = require('path'),
    slash = require('slash'),
    cwd = process.cwd()
;


describe('flat.step object', function(){
    it('should use the grunt-contrib-copy module', function(){
        expect(flat.step.name).toBe('copy');
    });
});

describe('flat.step.createConfig function', function(){

    var createConfig = flat.step.createConfig,
        context,
        block,
        destDir = path.join(cwd, 'spec/path/to/dest'),
        originDir = path.join(cwd, 'spec/fixtures')
    ;

    beforeEach(function() {
        context = {
            inFiles: [],
            inDir: originDir
        };
        block = {
            dest: destDir
        };
    });

    it('should return empty array if context.inFiles is not an array', function(){
        context.inFiles = 'foobar';
        var cfg = createConfig(context, block);
        expect(cfg).toEqual({files:[]});
        expect(context.outFiles).toEqual([]);
    });

    it('should return empty array if context.inFiles is empty', function(){
        var cfg = createConfig(context, block);
        expect(cfg).toEqual({files:[]});
        expect(context.outFiles).toEqual([]);
    });

    it('should return existing files', function(){
        context.inFiles = ['foo', 'bar', 'boo'];
        var cfg = createConfig(context, block);

        expect(cfg).toEqual({
            files:[{
                src: [path.join(originDir, 'foo')],
                dest: path.join(destDir, 'foo')
            },{
                src: [path.join(originDir, 'bar')],
                dest: path.join(destDir, 'bar')
            },{
                src: [path.join(originDir, 'boo')],
                dest: path.join(destDir, 'boo')
            }]
        });

        expect(context.outFiles).toEqual([
            path.join(destDir, 'foo'),
            path.join(destDir, 'bar'),
            path.join(destDir, 'boo')
        ]);
    });

    it('should not return invalid files', function(){
        context.inFiles = ['invalid', 'foo', 'invalid_too'];
        var cfg = createConfig(context, block);

        expect(cfg).toEqual({files:[{
            src: [path.join(originDir, 'foo')],
            dest: path.join(destDir, 'foo')
        }]});

        expect(context.outFiles).toEqual([
            path.join(destDir, 'foo')
        ]);
    });

    it('should return existing files', function(){
        context.inFiles = ['foo'];
        context.inDir = [
            path.join(cwd, 'invalid/path'),
            originDir,
            path.join(cwd, 'invalid/path/too')
        ];
        var cfg = createConfig(context, block);

        expect(cfg).toEqual({files:[{
            src: [path.join(originDir, 'foo')],
            dest: path.join(destDir, 'foo')
        }]});

        expect(context.outFiles).toEqual([
            path.join(destDir, 'foo')
        ]);
    });

});

describe('flat.blockReplacement function', function(){

    var blockReplacement = flat.blockReplacement,
        block,
        destDir = path.join(cwd, 'spec/path/to/dest'),
        originDir = path.join(cwd, 'spec/fixtures'),
        buildStartLine = 'build start line',
        buildEndLine = 'build end line',
        conditionalStartLine = 'conditional start line',
        conditionalEndLine = 'conditional end line'
    ;

    beforeEach(function() {
        block = {
            dest: destDir,
            src: [
                path.join(originDir, 'foo/bar'),
                path.join(originDir, 'baz/foo'),
                path.join(originDir, 'bar/baz'),
            ],
            raw: [
                '<script src="' + path.join(originDir, 'foo/bar') + '"></script>',
                '<script src="' + path.join(originDir, 'baz/foo') + '"></script>',
                '<script src="unmatched/file"></script>',
                '<script src="' + path.join(originDir, 'bar/baz') + '"></script>'
            ],
            conditionalStart: false,
            conditionalEnd: false
        };
    });

    it('should replace src in <script> tags', function(){
        block.raw.unshift(buildStartLine);
        block.raw.push(buildEndLine);
        var result = blockReplacement(block);
        expect(result).toBe([
            '<script src="' + slash(path.join(destDir, 'bar')) + '"></script>',
            '<script src="' + slash(path.join(destDir, 'foo')) + '"></script>',
            '<script src="unmatched/file"></script>',
            '<script src="' + slash(path.join(destDir, 'baz')) + '"></script>'
        ].join('\n'));
    });

    it('should take care of conditional lines', function(){
        block.raw.unshift(conditionalStartLine);
        block.conditionalStart = true;
        block.raw.push(conditionalEndLine);
        block.conditionalEnd = true;
        block.raw.unshift(buildStartLine);
        block.raw.push(buildEndLine);
        var result = blockReplacement(block);
        expect(result).toBe([
            '<script src="' + slash(path.join(destDir, 'bar')) + '"></script>',
            '<script src="' + slash(path.join(destDir, 'foo')) + '"></script>',
            '<script src="unmatched/file"></script>',
            '<script src="' + slash(path.join(destDir, 'baz')) + '"></script>'
        ].join('\n'));
    });

});
