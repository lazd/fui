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
			iocss: {
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
			script: {
				expand: true,
				cwd: 'scripts/',
				src: ['**'],
				dest: 'build/fui/scripts/'
			}
		},
		watch: {
			stylus: {
				files: ['styles/**/*.styl'],
				tasks: 'stylus'
			},
			examples: {
				files: [ 'examples/**' ],
				tasks: 'copy'
			}
		}
	});

	// Default task
	grunt.registerTask('default', ['stylus', 'concat', 'copy']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
