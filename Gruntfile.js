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
        noLineComments: true
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

    /******IMG COMPRESSION*********************/
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
        {
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: './img/',
          src: ['**/*.png'],
          // Could also match cwd line above. i.e. ./img/
          dest: './jekyll/img/',
          ext: '.png'
        }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
        {
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: './img/',
          src: ['**/*.jpg'],
          // Could also match cwd. i.e. ./img/
          dest: './jekyll/img/',
          ext: '.jpg'
        }
        ]
      }
    },





    watch: {
      grunt: { 
        files: ['Gruntfile.js'],
        tasks: ['compass:dev']
      },

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



grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.registerTask('imagemini', ['imagemin']);


}