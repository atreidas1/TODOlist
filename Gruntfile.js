module.exports = function (grunt) {

  grunt.initConfig({
    //Sass compiler###########################################################
    sass: {
      dist: {
        files: [{
          expand: false,
          cwd: 'src/style/',
          src: ['*.scss'],
          dest: 'build/style/',
          ext: '.css'
      }]
      }
    },
    //jade compiler###########################################################
    jade: {
      debug: {
        options: {
          data: {
            debug: true,
            timestamp: "<%= new Date().getTime() %>"
          }
        },
        files: [{
          expand: true,
          cwd: 'client/src/',
          src: ['*.jade'],
          dest: 'client/build/',
          ext: '.html'
      }]
      }
    },
    //file copy###########################################################
    copy: {
      main: {
        files: [
      // includes files within path
          {
            expand: true,
            cwd: 'client/src/js/',
            src: ['*.js'],
            dest: 'client/build/js/',
            filter: 'isFile'
          },

          {
            expand: true,
            cwd: 'client/src/css/',
            src: ['*.css'],
            dest: 'client/build/css/',
            filter: 'isFile'
          },
    ],
      },
    },
    concat: {
      dist: {
        src: [
            'js/libs/*.js', // Все JS в папке libs
            'js/global.js' // Конкретный файл
        ],
        dest: 'js/build/production.js',
      }
    },
    watch: {
      scripts: {
        files: ['client/src/*.jade','client/src/css/*.css'],
        tasks: ['jade','copy'],
        options: {
          spawn: false,
        },
      },
    }

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');

};
