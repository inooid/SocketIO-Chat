module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/css/style.css': ['private/css/*.scss', 'private/css/**/*.scss'],
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'public/js/main.js': ['private/js/main.js.coffee'],
          'public/js/light.js': ['private/js/light.js.coffee']
        }
      },
    },

    watch: {
      source: {
        files: ['private/css/**/*.scss', 'private/js/*.coffee'],
        tasks: ['sass', 'coffee'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  // grunt.registerTask('default', ['sass']);
}