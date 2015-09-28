'use strict';
var LIVERELOAD_PORT = 35729;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var fs = require('fs');
var path = require('path');
var templateCompiler = require('./bower_components/ember/ember-template-compiler');
// Configurable paths
var config = {
    app: 'app',
    dist: 'dist'
};

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        // Project settings
        config: yeomanConfig,
        watch: {
            emberTemplates: {
                files: '<%= yeoman.app %>/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            neuter: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['neuter']
            },
            replace:{
                files:['<%= yeoman.app %>/index.html'],
                tasks:['replace:app']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '.tmp/scripts/*.js',
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                force : true,
                jshintrc: '.jshintrc',
                reporter: require('jshint-junit-reporter'),
                reporterOutput: 'jshint-output.xml'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        preprocess: {
            dev: {
                options: {
                    context: {
                        NODE_ENV: 'development'
                    }
                },
                files: {
                    '.tmp/index.html' : '.tmp/index.html'
                }
            },
            dist: {
                options: {
                    context: {
                        NODE_ENV: 'production'
                    }
                },
                files: {
                    'dist/index.html' : 'dist/index.html'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css',
                        '<%= yeoman.app %>/bower_components/nvd3/nv.d3.min.css',
                        '<%= yeoman.app %>/bower_components/metisMenu/dist/metisMenu.min.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        replace: {
            app: {
                options: {
                    variables: {
                        jquery: 'bower_components/jquery/dist/jquery.js',
                        ember: 'bower_components/ember/ember.js',
                        emberTemplateCompiler: 'bower_components/ember/ember-template-compiler.js',
                        ember_data: 'bower_components/ember-data/ember-data.js'
                    }
                },
                files: [
                    {src: '<%= yeoman.app %>/index.html', dest: '.tmp/index.html'}
                ]
            },
            dist: {
                options: {
                    variables: {
                        jquery: 'bower_components/jquery/dist/jquery.min.js',
                        ember: 'bower_components/ember/ember.prod.js',
                        ember_data: 'bower_components/ember-data/ember-data.prod.js'
                    }
                },
                files: [
                    {src: '<%= yeoman.app %>/index.html', dest: '.tmp/index.html'}
                ]
            }
        },
        concurrent: {
            server: [
                'emberTemplates'
            ],
            dist: [
                'emberTemplates',
                'htmlmin'
            ]
        },
        emberTemplates: {
            build: {
                templateBasePath: 'app/templates/',
                src: ['<%= yeoman.app %>/templates/' + '**/*.hbs'],
                dest: '.tmp/scripts/compiled-templates.js'
            },
            dist: {
                templateBasePath: 'app/templates/',
                src: ['<%= yeoman.app %>/templates/' + '**/*.hbs'],
                dest: '.tmp/scripts/compiled-templates.js'
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return yeomanConfig.app + '/' + filepath;
                    },
                    includeSourceMap:true
                },
                src: '<%= yeoman.app %>/scripts/app.js',
                dest: '.tmp/scripts/combined-scripts.js'
            }
        }
    });

    grunt.registerMultiTask('emberTemplates', 'Pre-compile HTMLBars tempates', function() {

        var done = this.async();

        this.files.forEach(function (file) {
            if (!fs.existsSync(path.dirname(path.join(__dirname, file.dest)))){
                fs.mkdirSync(path.dirname(path.join(__dirname, file.dest)));
            }
            var stream = fs.createWriteStream(path.join(__dirname, file.dest), {
                encoding: 'utf8'
            });

            stream.once('open', function (fd) {
                grunt.log.writeln('Pre-compiling ' + file.src.length + ' handlebars templates...');

                // process each template
                file.src.forEach(function (f) {

                    // load the template
                    var template = fs.readFileSync(path.join(__dirname, f), {
                        encoding: 'utf8'
                    });
                    var templateName = f.replace(file.templateBasePath, '').replace(/\.hbs$/, '');
                    var filename = path.basename(f).replace(/\.hbs$/, '');
                    // compile the template
                    stream.write('Ember.TEMPLATES["' + templateName + '"] = Ember.HTMLBars.template(');
                    stream.write(templateCompiler.precompile(template) + ');\n\n');
                });

                stream.end(done);
            });
        });
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'replace:app',
            'preprocess:dev',
            'concurrent:server',
            'neuter:app',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'preprocess:dist'
    ]);
};
