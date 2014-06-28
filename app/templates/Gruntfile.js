// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> v<%= pkg.version %>
module.exports = function(grunt) {

  var config = {
    clean: {
      public: 'public/**/*'
    },
    copy: {
      src: {
        files: [{
          expand: true,
          src: [
            'node_modules/MD5/**/*',
            'node_modules/socket.io/**/*',
            '*.html',
            'package.json',
            'sound.mp3',
            'sound.ogg',
            '.gitignore',
            'font/**.*',
            'server.js'
          ],
          dest: 'public/'
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/scripts.js': ['js/jquery.min.js', 'js/mustache.js','js/md5.js', 'js/mute.js', 'js/twitter-text.js', 'js/client.js']
        }
      }
    },
    cssmin: {
       combine: {
         files: {
            'public/css/styles.css': ['css/*.css']
          }
       }
    },
    usemin: {
      html: 'public/index.html'
    }
  };

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['clean','copy', 'uglify', 'cssmin', 'usemin']);
};
