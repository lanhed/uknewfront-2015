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
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.dev %>/**/*.html'
        ]
      }
    },

    connect: {
      options: {
        port: 9001,
        livereload: 35729,
        hostname: '*'
      },
      livereload: {
        options: {
          base: '<%= app.dev %>'
        }
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

    

    copy: {
      distImages: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>/images',
          src: [ '**/*' ],
          dest: '<%= app.dist %>/images'
        }]
      },

      distHtml: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>',
          src: [ '**/*.html' ],
          dest: '<%= app.dist %>'
        }]
      }
    }
  });

  grunt.registerTask('server', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev', [
    'autoprefixer:dev'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:distImages',
    'copy:distHtml'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};