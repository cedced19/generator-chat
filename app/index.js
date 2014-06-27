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
      name: 'ip',
      message: 'What is the IP of your chat?',
      default: 'localhost'
    },{
      type: 'confirm',
      name: 'english',
      message: 'Would you like to set chat in english?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.author = props.author;
      this.description = props.description;
      this.port = props.port;
      this.ip = props.ip;
      this.english = props.english;

      done();

  var extractGeneratorName = function (_, appname) {
    var slugged = _.slugify(title);
    var match = slugged.match(/^$/);

    if (match && match.length === 2){
      return match[1].toLowerCase();
  }

  return slugged;
  };
    }.bind(this));
  },


  app: function () {
    this.mkdir('js');
    this.mkdir('css');
    this.mkdir('font');

    this.template('index.html', 'index.html');
    this.template('server.js', 'server.js');
    this.template('_package.json', 'package.json');
    this.template('js/client.js', 'js/client.js');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('README.md', 'README.md');


    this.copy('css/style.css', 'css/style.css');
    this.copy('css/fontello.css', 'css/fontello.css');
    this.copy('js/jquery.min.js', 'js/jquery.min.js');
    this.copy('js/md5.js', 'js/md5.js');
    this.copy('js/mute.js', 'js/mute.js');
    this.copy('js/mustache.js', 'js/mustache.js');
    this.copy('_bower.json', 'bower.json');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('500.html', '500.html');
    this.copy('404.html', '404.html');
    this.copy('font/fontello.eot', 'font/fontello');
    this.copy('font/fontello.svg', 'font/fontello.svg');
    this.copy('font/fontello.ttf', 'font/fontello.ttf');
    this.copy('font/fontello.woff', 'font/fontello.woff');
  },


  projectfiles: function () {
  }
});

module.exports = JadestylGenerator;
