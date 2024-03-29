module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-jasmine');

	grunt.initConfig({
		project: grunt.file.readJSON('package.json'),


		jshint: {
			files: ['Gruntfile.js', 'src/main/js/**/*.js','src/test/js/**/*.js']
		},

		typescript: {
			base: {
				src: ['src/main/ts/**/*.ts'],
				dest: 'target/tsjs/',
				options: {
					module: 'commonjs', //or commonjs 
					target: 'es5',
					keepDirectoryHierarchy: true,
					rootDir: 'src/main/ts',
					outDir: "target/tsjs/",
					sourceMap: true,
					declaration: true
				}
			}
		},

		ts: {
			base: {
				src: [ 'src/main/ts/**/*.ts' ],
				dest: 'target/tsjs/',
				options: {
					baseDir: 'src/main/ts/',
					rootDir: "src/main/ts/",
					outDir: "target/tsjs/",
					module: 'commonjs',
					target: 'es5',
					sourceMap: true,
					declaration: true
				}
			}
		},

		jasmine: {
			run: {
				src: ['src/main/ts/**/*.js'],
				options: {
					// the tests
					specs: 'src/test/ts/**/*Test.js',
					keepRunner: true, // useful for debugging

					// -- additional JUnit compliant test reports that Jenkins is able to analyze
					junit: {
						path: "<%= dir.target %>/surefire-reports",
						consolidate: false
					}
				}
			}
		},

	});
	grunt.registerTask('default', [ 'jshint' ]);
	grunt.registerTask('compile', [ 'ts' ]);
	grunt.registerTask('test', [ 'ts', 'jasmine' ]);
};
