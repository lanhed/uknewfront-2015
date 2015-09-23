module.exports = function(grunt) {
  "use strict";

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    app: {
      dev: 'dev',
      dist: 'dist'
    },

    watch: {
      options: {
        nospawn: false
      },
      styles: {
        files: ['<%= app.dev %>/styles/*.less'],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.dev %>/**/*.html',
          '<%= app.dev %>/scripts/**/*.js',
          '<%= app.dev %>/styles/**/*.css',
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '*'
      },
      livereload: {
        options: {
          base: '<%= app.dev %>'
        }
      }
    },

    less: {
      options: {
        files: [
        ]
      },
      dev: {
        files: {
          '<%= app.dev %>/styles/main.css': '<%= app.dev %>/styles/main.less',
        }
      },
      dist: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          files: [
          ]
        },
        files: {
          '<%= app.dist %>/styles/main.css': '<%= app.dev %>/styles/main.less',
        }
      }
    },

    autoprefixer: {
      options: {
      },
      dev: {
        src: '<%= app.dev %>/styles/main.css'
      },
      dist: {
        src: '<%= app.dist %>/styles/main.css'
      }
    },

    clean: {
      dev: {
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= app.dist %>'
          ]
        }]
      }
    },

    requirejs: {
      dist: {
        options: {
          optimize: 'uglify',
          name: 'main',
          mainConfigFile: '<%= app.dev %>/scripts/main.js',
          out: '<%= app.dist %>/scripts/main.js'
        }
      }
    },

    

    copy: {
      distImages: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>/images',
          src: [ '**/*' ],
          dest: '<%= app.dist %>/images'
        }]
      },

      distStyles: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>/styles',
          src: [ '**/*.css' ],
          dest: '<%= app.dist %>/styles'
        }]
      },

      distHtml: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>',
          src: [ '**/*.html' ],
          dest: '<%= app.dist %>'
        }]
      },

      distRequire: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>/bower_components/requirejs',
          src: [ 'require.js' ],
          dest: '<%= app.dist %>/bower_components/requirejs'
        }]
      }
    }
  });

  grunt.registerTask('server', [
    'less:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev', [
    'less:dev',
    'autoprefixer:dev'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'less:dist',
    'autoprefixer:dist',
    'requirejs:dist',
    'copy:distImages',
    'copy:distHtml',
    'copy:distRequire',
    'copy:distStyles'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};