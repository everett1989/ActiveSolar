module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),



    compass: {
      options: {
        importPath: ['bower_components/foundation/scss'], 
        //importPath: ['bower_components/foundation-icon-fonts'],
        //importPath: ['bower_components/stackicons-master/scss'],
        sassDir: 'scss',
        //cssDir: 'jekyll/_assets/stylesheets',
        cssDir: 'jekyll/source/css',
       // fontsPath: 'bower_components/fosundation-icon-fonts',
        
        imagesDir: 'img',
        javascriptsDir: 'js',

        fontsDir: 'bower_components/foundation-icon-fonts',
        outputStyle: 'nested',
        relativeAssets: true,
        noLineComments: false,
       // assetCacheBuster: false
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
          dest: './jekyll/source/img/',
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
          dest: './jekyll/source/img/',
          ext: '.jpg'
        }
        ]
      }
    },

    /*******************HTML COMPRESSION***********************/
htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: [
      {
          expand: true,     // Enable dynamic expansion.
          cwd: './site',      // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: './site',   // Destination path prefix.
        },
        ]
      // files: {                                   // Dictionary of files
      //   './site/*': './site/*',     // 'destination': 'source'
      //   //'dist/contact.html': 'src/contact.html'
      // }
    },
    // dev: {                                       // Another target
    //   files: {
    //     'dist/index.html': 'src/index.html',
    //     'dist/contact.html': 'src/contact.html'
    //   }
    // }
  },

  /*********************UGLIFY JS*********************/
  uglify: {
    js: {
      files: {
        
        "jekyll/source/js/app.min.js":[
        'bower_components/foundation/js/vendor/jquery.js',
        'bower_components/foundation/js/foundation.min.js',
        'js/foundation-options.js'
        ],
        "jekyll/source/js/modernizr.min.js":'bower_components/foundation/js/vendor/modernizr.js',
        "jekyll/source/js/ie8-alert.min.js":'js/ie8-alert.js'
        
      }
    }
  },


///Concaticnation/////////////////
  //  directives: {
  //   // options: {
  //   //   // Task-specific options go here.
  //   //    files: { 'dest/output': 'src/input' },
  //   // },
  //   your_target: {

  //     files: { 'jekyll/_assets/javascripts/test.js': 'foundation/js/vendor/jquery.js',
  //      'jekyll/_assets/javascripts/test.js': 'foundation/js/foundation.min.js'},
  //     // Target-specific file lists and/or options go here.
  //   },
  // },

  //  concat: {
  //   options: {
  //     separator: ';',
  //   },
  //   dist: {
  //     src: ['bower_components/foundation/js/vendor/jquery.js', 'bower_components/foundation/js/foundation.min.js'],
  //     dest: 'jekyll/_assets/javascripts/test.js',
  //   },
  // },



  //   jekyll: {                             // Task
  //   options: {                          // Universal options
  //     watch: true,
  //     serve:true
      
  //   }
  // },

  watch: {
    grunt: { 
      files: ['Gruntfile.js'],
      tasks: ['compass:dev','uglify']
    },

    fi_icons:{ 
      files: 'bower_components/foundation-icon-fonts/**/*.scss',
      tasks: ['compass:dev']
    },

      // font_awesome:{ 
      //   files: 'bower_components/font-awesome/**/*.scss',
      //   tasks: ['compass:dev']
      // },

      uglify:{
        files: ['js/*.js',],
        tasks: ['uglify']

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




grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.registerTask('imagemini', ['imagemin']);


grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.registerTask('minihtml', ['htmlmin']);

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('minijs', ['uglify']);


// grunt.loadNpmTasks('grunt-sprockets-directives');
// grunt.registerTask('concat',['directives'])


// grunt.loadNpmTasks('grunt-contrib-concat');


grunt.loadNpmTasks('grunt-bowercopy');
grunt.loadNpmTasks('grunt-jekyll');
//grunt.registerTask("copy",['bowercopy'])

// grunt.loadNpmTasks('grunt-bower');

grunt.registerTask('default', ['compass:dev','watch']);
}