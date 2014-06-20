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
        //noLineComments: false,
       // assetCacheBuster: false
     },
     dev: {
      files: {
        'css/app.css': 'scss/app.scss'
      },
      options: {
        outputStyle: 'compressed',
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
      files: [{         
          expand: true,// Set to true to enable the following options…     
          cwd: './img/', // cwd is 'current working directory'
          src: ['**/*.png'],      
          dest: './jekyll/source/img/',  // Could also match cwd line above. i.e. ./img/
          ext: '.png'
        }]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
        {     
          expand: true,// Set to true to enable the following options…         
          cwd: './img/',// cwd is 'current working directory'
          src: ['**/*.jpg'],     
          dest: './jekyll/source/img/',// Could also match cwd. i.e. ./img/
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
      files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: './site',      // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: './site',   // Destination path prefix.
      }]
    },
  },

  /*********************UGLIFY JS*********************/
  uglify: {

    // foundation: {
    //     files:{ 
    //       "jekyll/source/js/app.min.js":[
    //       'bower_components/foundation/js/vendor/jquery.js',
    //       'bower_components/foundation/js/foundation/foundation.js',
    //       'bower_components/foundation/js/foundation/foundation.abide.js',
    //       'bower_components/foundation/js/foundation/foundation.clearing.js',
    //       'bower_components/foundation/js/foundation/foundation.magellan.js',
    //       'bower_components/foundation/js/foundation/foundation.orbit.js',
    //       'bower_components/foundation/js/foundation/foundation.reveal.js',
    //       'bower_components/foundation/js/foundation/foundation.slider.js',
    //       'bower_components/foundation/js/foundation/foundation.topbar.js',
    //       'js/foundation-options.js'

    //       ]


    //   }
    //       //expand: true,
    //       //cwd: 'bower_components/foundation/js/foundation',
    //       //src: "jekyll/source/js/test":['foundation.js','abide.js']
    //       //dest: 'jekyll/source/js/test'
        
    // },




    js: {
      files: {
        
        "jekyll/source/js/app.min.js":[
        'bower_components/foundation/js/vendor/jquery.js',
        'bower_components/foundation/js/foundation.min.js',
        'js/foundation-options.js',
        //'bower_components/foundation/js/vendor/fastclick.js',
        ],
        "jekyll/source/js/modernizr.min.js":'bower_components/foundation/js/vendor/modernizr.js',
        "jekyll/source/js/ie8-alert.min.js":'js/ie8-alert.js',
        "jekyll/source/js/google-api.min.js":'js/google-api.js'
        
      }
    }
  },

   smushit: {

    // src folder is 'tests/img' and dest is 'tests/opt_img'
    group1: {
      cwd: './img/',
      expand: true,
      src: ['**/*.jpg','**/*.png'],
      dest: './jekyll/source/img/'
    }
   
 // {     
 //    expand: true,// Set to true to enable the following options…         
 //    cwd: './img/',// cwd is 'current working directory'
 //    src: ['**/*.jpg'],     
 //    dest: './jekyll/source/img/',// Could also match cwd. i.e. ./img/
 //    ext: '.jpg'
 //        }


  },




  watch: {
    grunt: { 
      files: ['Gruntfile.js'],
      tasks: ['compass:dev','uglify']
    },

    fi_icons:{ 
      files: 'bower_components/foundation-icon-fonts/**/*.scss',
      tasks: ['compass:dev']
    },

    uglify:{
      files: ['js/*.js',],
      tasks: ['uglify']
    },

    sass: {
      files: ['scss/**/*.scss','bower_components/foundation/scss/**/*.scss'],
      tasks: ['compass:dev']
      },

    // minihtml:{
    //   files: 'site/*.html',
    //    tasks: ['newer:htmlmin']
    // },

    // smushit:{
    //   files: 'img/**/*',
    //   tasks: ['newer:smushit']
    // }

    // imagemin:{
    //   files: 'img/**/*',
    //   tasks: ['newer:imagemin']
    // }
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

grunt.registerTask('minipic', ['smushit']);
grunt.loadNpmTasks('grunt-smushit');


grunt.loadNpmTasks('grunt-newer');



// grunt.loadNpmTasks('grunt-sprockets-directives');
// grunt.registerTask('concat',['directives'])


// grunt.loadNpmTasks('grunt-contrib-concat');


//grunt.loadNpmTasks('grunt-bowercopy');
//grunt.loadNpmTasks('grunt-jekyll');
//grunt.registerTask("copy",['bowercopy'])

// grunt.loadNpmTasks('grunt-bower');

grunt.registerTask('default', ['compass:dev','watch']);


}