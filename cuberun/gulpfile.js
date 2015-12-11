'use strict';

/* eslint no-var:0 */
var gulp = require('gulp');
var annotate = require('gulp-ng-annotate');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var eslint = require('gulp-eslint');
var ignore = require('gulp-ignore');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var errcb = function(err) {
  console.error(err.stack || err.message || err);
  this.emit('end');
};

gulp.task('js-client', function() {
  return gulp
    .src(['src/scripts/**/*.js'])
    .pipe(babel())
    .on('error', errcb)
    .pipe(annotate())
    .pipe(uglify())
    .pipe(concat('client.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('lint', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('html', function() {
  return gulp
    .src(['src/views/**/*.jade'])
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
  var nm = __dirname + '/node_modules';

  return gulp
    .src(['src/styles/**/*.scss'])
    .pipe(sass({
      indentedSyntax: false,
      sourceComments: 'normal',
      outputStyle: 'nested',
      includePaths: ['bourbon', 'bourbon-neat'].map(function(p) {
        return nm + '/' + p + '/app/assets/stylesheets'; // eslint-disable-line prefer-template
      })
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(cssmin({
      keepBreaks: true
    }))
    .pipe(concat('client.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['lint', 'js-client', 'html', 'css']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/styles/**/*.scss'], ['css']);
  gulp.watch(['src/views/**/*.jade'], ['html']);
  gulp.watch(['src/scripts/**/*.js'], ['js-client']);
});

gulp.task('default', ['build']);
