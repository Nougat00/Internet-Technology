module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.initConfig({
        compress: {
            main: {
                options: {
                    archive: 'ropuszka.zip'
                },
                files: [{
                    src: ['package.json', 'bower.json', 'Gruntfile.js', 'serwer.js', 'public/**', 'views/**', 'db/*']
                }]
            }
        },
        rename: {
            main: {
               files: [
                           {src: ['ropuszka.zip'], dest: 'ropuszka.pdf'},
                  ]
            }
         }    });
    grunt.registerTask('default', ['compress', 'rename']);

};
