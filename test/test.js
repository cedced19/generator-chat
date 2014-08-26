'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var JadestylGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Chat generator!'));

    var prompts = [{
      name: 'title',
      message: 'What is the title of your chat?',
      default: this.appname
    },{
      name: 'author',
      message: 'What is your name?'
    },{
      name: 'description',
      message: 'What is the description of your chat?',
      default: 'A chat with Socket.io and Node.js !'
    },{
      name: 'port',
      message: 'What is the port of your chat?',
      default: '1337'
    },{
      type: 'list',
      name: 'languageChoice',
      message: 'What language you want to use?',
      choices: [{
      name: 'English',
      value: 'english'
      }, {
      name: 'Français',
      value: 'french'
      }, {
      name: 'Deutsch',
      value: 'german'
      }]
      },{
      type: 'confirm',
      name: 'animate',
      message: 'Would you like animate "login form" ?',
      default: false
      },{
      type: 'list',
      name: 'colorChoice',
      message: 'What color you want to use?',
      choices: [{
      name: 'Green',
      value: 'green'
      }, {
      name: 'Pink',
      value: 'pink'
      }, {
      name: 'Blue',
      value: 'blue'
    }]
  }];

    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.author = props.author;
      this.description = props.description;
      this.port = props.port;
      this.languageSelected = getLanguageChoice(props);
      this.animate = props.animate;
      this.colorSelected = getColorChoice(props);

      done();

  var extractGeneratorName = function (_, appname) {
    var slugged = _.slugify(title);
    var match = slugged.match(/^$/);

    if (match && match.length === 2) {
      return match[1].toLowerCase();
  }

  return slugged;
  };
    }.bind(this));
  },


    bower: function () {
        var bower = {
          name: this._.slugify(this.title + '-jadestyl'),
          private: true,
          dependencies: {}
        };

        this.write('bower.json', JSON.stringify(bower, null, 2));
      },

  app: function () {
    this.mkdir('vendor');
    this.mkdir('vendor/js');
    this.mkdir('vendor/css');
    this.mkdir('vendor/font');

    this.template('index.html', 'index.html');
    this.template('server.js', 'server.js');
    this.template('_package.json', 'package.json');
    this.template('vendor/js/client.js', 'vendor/js/client.js');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('README.md', 'README.md');

    this.copy('sound.mp3', 'sound.mp3');
    this.copy('sound.ogg', 'sound.ogg');
    this.copy('vendor/css/style.css', 'vendor/css/style.css');
    this.copy('vendor/css/fontello.css', 'vendor/css/fontello.css');
    this.copy('vendor/js/jquery.min.js', 'vendor/js/jquery.min.js');
    this.copy('vendor/js/mute.js', 'vendor/js/mute.js');
    this.copy('vendor/js/twitter-text.js', 'vendor/js/twitter-text.js');
    this.copy('vendor/js/mustache.js', 'vendor/js/mustache.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('vendor/font/fontello.eot', 'vendor/font/fontello');
    this.copy('vendor/font/fontello.svg', 'vendor/font/fontello.svg');
    this.copy('vendor/font/fontello.ttf', 'vendor/font/fontello.ttf');
    this.copy('vendor/font/fontello.woff', 'vendor/font/fontello.woff');
    this.copy('favicon.ico', 'favicon.ico');

    if(this.colorSelected == 'pink'){
      this.copy('vendor/css/pink.css', 'vendor/css/pink.css');
    }

    if(this.colorSelected == 'blue'){
      this.copy('vendor/css/blue.css', 'vendor/css/blue.css');
    }

    if(this.animate){
      this.copy('vendor/css/animate.css', 'vendor/css/animate.css');
    }
  },


  projectfiles: function () {
  }
});

function getLanguageChoice(props) {
  var choices = props.languageChoice;

  if(choices.indexOf('french') !== -1) {
    return 'french';
  }

  if(choices.indexOf('english') !== -1) {
    return 'english';
  }

  if(choices.indexOf('german') !== -1) {
    return 'german';
  }
}

function getColorChoice(props) {
  var choices = props.colorChoice;

  if(choices.indexOf('green') !== -1) {
    return 'green';
  }

  if(choices.indexOf('pink') !== -1) {
    return 'pink';
  }

  if(choices.indexOf('blue') !== -1) {
    return 'blue';
  }
}

module.exports = JadestylGenerator;