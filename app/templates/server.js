// Module Dependencies
var express = require('express'),
  app = express();
  http = require('http'),
  path = require('path'),
  fs = require("fs"),
  _ = require('lodash'),
  dir  = require('node-dir');

var conf = _.extend({
    dir : path.join(__dirname, 'app'),
    port : 8080
  },conf);

var relative_dirs = function(curr) {
  return path.relative(conf.dir, curr);
}

var excluded_folders = function(val) {
  return !val.match("bower_components");
}

module.exports = function(conf){

  app.use(require('connect-livereload')());
  app.set("views", conf.dir)
  app.engine('jade', require('jade').__express);

  app.get("/", function(req, res, next) {
    dir.paths(conf.dir, function(err,paths){
      if(err)
        res.send(500);
      var filtered_dirs = paths.dirs.filter(excluded_folders).map(relative_dirs);
      res.render("../templates/index.jade", {dirs:filtered_dirs});
    })
  });

  app.use(express.static('app'));
  app.use('/js', express.static('dist'));

  app.listen(conf.port);
  console.log("Server started in http://localhost:" + conf.port);
}
