var gulp = require('gulp'),
  path = require('path'),
  uglify = require('gulp-uglify'),
  EXPRESS_ROOT = path.join(__dirname, 'app');

var startExpress = function() {
    var server = require('./server.js');
    server({
      dir:EXPRESS_ROOT,
      port: 8080
    });
}

var startLiveReload = function() {
  var lr = require('tiny-lr')();
  lr.listen(35729);
  return lr;
}

var notifyLivereload = function(event, lr) {
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('compress', function() {
  gulp.src('js/*/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', function () {

  startExpress();
  var lr = startLiveReload();

  gulp.watch('app/**', function(event){
    notifyLivereload(event, lr);
  });

  gulp.watch('js/**', function(event){
    notifyLivereload(event, lr);
  });
});
