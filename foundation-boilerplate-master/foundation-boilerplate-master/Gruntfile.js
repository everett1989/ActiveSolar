module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      options: {
        importPath: ['bower_components/foundation/scss'],
        sassDir: 'scss',
        cssDir: 'css',
        imagesDir: 'img',
        javascriptsDir: 'js',
        outputStyle: 'nested',
        relativeAssets: true,
        noLineComments: false
      },
      dev: {
        files: {
          'css/app.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['compass:dev']
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['compass:prod']);
  grunt.registerTask('default', ['compass:dev','watch']);
}