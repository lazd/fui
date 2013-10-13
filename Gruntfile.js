/*global module:false*/
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		stylus: {
			compile: {
				options: {
					'paths': [
					    'node_modules/'
					]
				},
				files: {
					'build/fui/fui.css': 'styles/fui.styl'
				}
			}
		},
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						'* <%= pkg.homepage %>/\n' +
						'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; Licensed <%= pkg.license %> */\n'
			},
			css: {
				files: {
					'build/fui/fui.css': 'build/fui/fui.css'
				}
			}
		},
		copy: {
			examples: {
				expand: true,
				cwd: 'examples/',
				src: ['**'],
				dest: 'build/'
			},
			fonts: {
				expand: true,
				cwd: 'fonts/',
				src: ['**'],
				dest: 'build/fui/fonts/'
			},
			script: {
				expand: true,
				cwd: 'scripts/',
				src: ['**'],
				dest: 'build/fui/scripts/'
			}
		},
		watch: {
			stylus: {
				files: ['styles/**/*.styl', 'styles/**/*.css'],
				tasks: ['stylus', 'concat']
			},
			scripts: {
				files: ['scripts/**/*.js'],
				tasks: 'copy'
			},
			examples: {
				files: ['examples/**'],
				tasks: 'copy'
			}
		}
	});

	// Default task
	grunt.registerTask('default', ['stylus', 'copy', 'concat']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
