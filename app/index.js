'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('D3StarterKit') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'karma',
      message: 'Create karma example?',
      default: true
    }, {
      type: 'confirm',
      name: 'example',
      message: 'Create D3 example?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.karma = props.karma;
      this.example = props.example;
      done();
    }.bind(this));

  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.mkdir('templates');
      this.mkdir('app');
      this.mkdir('js');

      this.fs.copy(
        this.templatePath('index.jade'),
        this.destinationPath('templates/index.jade')
      );
      this.fs.copy(
        this.templatePath('server.js'),
        this.destinationPath('server.js')
      );
      if (this.karma) {
        this.mkdir('js/karma');
        this.fs.copy(
          this.templatePath('hello.js'),
          this.destinationPath('js/karma/hello.js')
        );
        this.fs.copy(
          this.templatePath('hello.spec.js'),
          this.destinationPath('spec/hello.spec.js')
        );
        this.fs.copy(
          this.templatePath('_karma.conf.js'),
          this.destinationPath('karma.conf.js')
        );
      }
      if (this.example) {
        this.mkdir('js/example');
        this.mkdir('app/example');
        this.fs.copy(
          this.templatePath('example.js'),
          this.destinationPath('js/example/index.js')
        );
        this.fs.copy(
          this.templatePath('example.html'),
          this.destinationPath('app/example/index.html')
        );
        this.fs.copy(
          this.templatePath('data.csv'),
          this.destinationPath('app/example/data.csv')
        );
      }
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
