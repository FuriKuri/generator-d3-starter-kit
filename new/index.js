'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var NewGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('Creating new page:' + this.name);
    this.template('_index.html', "app/"+this.name+"/index.html");
    this.template('_index.js', "js/"+this.name+"/index.js");
    this.template('_data.json', "app/"+this.name+"/data.json");
  }
});

module.exports = NewGenerator;
