'use strict';
module.exports = function (grunt) {
    var DemoCss = [
                        'resource/dev/css/ks.css',
                        'resource/dev/css/header.css',
                        'resource/dev/css/body.css',
                        'resource/dev/css/module.css'
                     ];
    var DemoJs = [
                      'resource/dev/js/a.js',
                      'resource/dev/js/b.js'
    ];
	grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),
      concat: {
            options: {
                separator: ' ',
                stripBanners: true
            },
            css: {
                src: DemoCss,
                dest: "resource/dev/css/demo.css"
            },
            js : {
                src: DemoJs,
                dest: "resource/dev/js/demo.js"
            }
      },
      cssmin : {
          demoMinify: {
              expand: true,
              cwd: 'resource/dev/css/',
              src: ['demo.css', '!*.min.css'],
              dest: 'resource/assets/css/',
              ext: '.min.css'
          }
      },
      htmlmin : {
          template: {
              options: {
                  removeComments: true
              },
              files: {
                  'template/index.html': 'fe_template/index.html'
              }
          }
      },
      uglify:{
        jsMin: {
            files: {
                'resource/assets/js/demo.min.js': ['resource/dev/js/demo.js']
            }
        }
    },
    imagemin: {
        dist: {
            options: {
                optimizationLevel: 3
            },
            files: {
                'resource/assets/images/ad.jpg': 'resource/dev/images/ad.jpg'
            }
        }
    },
    watch:{
          dev : {
              files : ['resource/dev/css/*.css',
                        'resource/dev/js/*.js',
                        'resource/dev/images/*.*',
                        'fe_template/*.html'
                        ],
              tasks : ['concat','cssmin','uglify','imagemin','htmlmin']
          }
      }
	});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['cancat','cssmin','imagemin','htmlmin','uglify','watch']);
};