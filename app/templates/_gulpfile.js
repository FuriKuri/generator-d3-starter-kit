var gulp = require('gulp'),
  path = require('path'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
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

var compress = function() {
  gulp.src('js/*/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
};

gulp.task('lint', function() {
    return gulp.src(['js/*/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compress', compress);

gulp.task('default', function () {
  compress();
  startExpress();
  var lr = startLiveReload();

  gulp.watch('app/**', function(event){
    notifyLivereload(event, lr);
  });

  gulp.watch('js/**', function(event){
    compress();
    notifyLivereload(event, lr);
  });
});
