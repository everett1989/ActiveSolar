module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),



    compass: {
      options: {
        importPath: ['bower_components/foundation/scss'], 
        //importPath: ['bower_components/foundation-icon-fonts'],
        //importPath: ['bower_components/stackicons-master/scss'],
        sassDir: 'scss',
        cssDir: 'jekyll/css',
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

      fi_icons:{ 
        files: 'bower_components/foundation-icon-fonts/**/*.scss',
        tasks: ['compass:dev']
      },

       font_awesome:{ 
        files: 'bower_components/font-awesome/**/*.scss',
        tasks: ['compass:dev']
      },

      sass: {
        files: 'scss/**/*.scss',
        //files: 'bower_components/stackicons-master/stackicons-social-minimal/**/*.scss',
        tasks: ['compass:dev']
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['compass:prod']);
  grunt.registerTask('default', ['compass:dev','watch']);
}