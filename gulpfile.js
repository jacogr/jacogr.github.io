'use strict';

/* eslint no-var:0 */
var gulp = require('gulp');
var jade = require('gulp-jade');

var errcb = function(err) {
  console.error(err.stack || err.message || err);
  this.emit('end');
};

gulp.task('html', function() {
  return gulp
    .src(['src/views/**/*.jade'])
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['html']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/views/**/*.jade'], ['html']);
});

gulp.task('default', ['build']);
