module.exports = function (grunt) {

    grunt.initConfig({
        react: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'src_client',
                        src: '**/*.jsx',
                        dest: 'static/js',
                        ext: '.js'
                    }
                
                ]
            }
        },
        watch: {
            scripts: {
                files: 'src_client/**/*.jsx',
                tasks: ['react'],
                options: {
                    interrupt: true,
                },
            },
        },
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
};
