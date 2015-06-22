'use strict';
var path = require('path'),
	helpers = require('yeoman-generator').test,
	assert = require('yeoman-generator').assert;

describe('Chat generator', function () {
	// not testing the actual run of generators yet
	it('the generator can be required without throwing', function () {
		this.app = require('../app');
	});

	describe('run test', function () {

		var expectedContent = [
			['package.json', /"version": "0.0.0"/]
		];
		var expected = [
			'.gitignore',
			'gulpfile.js',
			'package.json',
			'README.md',
			'index.html',
			'vendor/js/jquery.min.js',
			'vendor/js/app.js',
			'vendor/js/mustache.js',
			'vendor/js/mute.js',
			'vendor/js/sweet-alert.js',
			'vendor/js/twitter-text.js',
			'vendor/sound/sound.mp3',
			'vendor/sound/sound.ogg',
			'vendor/css/style.css',
			'vendor/css/sweet-alert.css'
		];

		var options = {
			'skip-install-message': true,
			'skip-install': true,
			'skip-welcome-message': true,
			'skip-message': true
		};

		var runGen;

		beforeEach(function () {
			runGen = helpers
				.run(path.join(__dirname, '../app'))
				.inDir(path.join(__dirname, '.tmp'))
				.withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
		});

		 it('creates english and green expected files', function (done) {
			runGen.withOptions(options).withPrompt({
			 languageChoice: ['english'],
			 colorChoice: ['green'],
			 author: 'cedced19'
			}).on('end', function () {

				assert.file(expected);
				assert.fileContent([].concat(
					expectedContent,
					[
						['index.html', /Welcome/]
					]
				));
				assert.noFileContent([
					['index.html', /Bienvenue/],
					['index.html', /Herzlich willkommen/],
					['index.html', /blue/],
					['index.html', /pink/],
				]);
				done();
			});
		});

		 it('creates english, animate and green expected files', function (done) {
			runGen.withOptions(options).withPrompt({
			 languageChoice: ['english'],
			 colorChoice: ['green'],
			 author: 'cedced19',
			 animate: true
			}).on('end', function () {

				assert.file([].concat(
					expected,
					[
						'vendor/css/animate.css'
					]
				));
				assert.fileContent([].concat(
					expectedContent,
					[
						['index.html', /Welcome/],
						['index.html', /animate/],
					]
				));
				assert.noFileContent([
					['index.html', /Bienvenue/],
					['index.html', /Herzlich willkommen/],
					['index.html', /blue/],
					['index.html', /pink/],
				]);
				done();
			});
		});

		it('creates german and pink expected files', function (done) {
			runGen.withOptions(options).withPrompt({
			 languageChoice: ['german'],
			 colorChoice: ['pink'],
			 author: 'cedced19'
			}).on('end', function () {

				assert.file([].concat(
					expected,
					[
						'vendor/css/pink.css'
					]
				));
				assert.fileContent([].concat(
					expectedContent,
					[
						['index.html', /pink/],
						['index.html', /Herzlich willkommen/]
					]
				));
				assert.noFileContent([
					['index.html', /Welcome/],
					['index.html', /Bienvenue/],
					['index.html', /blue/]
				]);
				done();
			});
		});

		it('creates french and blue expected files', function (done) {
			runGen.withOptions(options).withPrompt({
			 languageChoice: ['french'],
			 colorChoice: ['blue'],
			 author: 'cedced19'
			}).on('end', function () {

				assert.file([].concat(
					expected,
					[
						'vendor/css/blue.css'
					]
				));
				assert.fileContent([].concat(
					expectedContent,
					[
						['index.html', /blue/],
						['index.html', /Bienvenue/]
					]
				));
				assert.noFileContent([
					['index.html', /Welcome/],
					['index.html', /Herzlich willkommen/],
					['index.html', /pink/]
				]);
				done();
			});
		});
	});
});
