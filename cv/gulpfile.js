'use strict';

/* eslint no-var:0 */
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
// var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var eslint = require('gulp-eslint');
var ignore = require('gulp-ignore');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stylemod = require('gulp-style-modules');
var vulcanize = require('gulp-vulcanize');
// var uglify = require('gulp-uglify');

var errcb = function(err) {
  console.error(err.stack || err.message || err);
  this.emit('end');
};

gulp.task('js', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .on('error', errcb)
    // .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('component-js', ['js']);

gulp.task('lint', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('html', function() {
  return gulp
    .src(['src/**/*.jade'])
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

gulp.task('component-html', ['html']);

gulp.task('css', function() {
  var nm = path.join(__dirname, '/node_modules'); // eslint-disable-line no-undef

  return gulp
    .src(['src/**/*.scss'])
    .pipe(sass({
      indentedSyntax: false,
      sourceComments: 'normal',
      outputStyle: 'nested',
      includePaths: [
        path.join(nm, '/bourbon/app/assets/stylesheets'),
        path.join(nm, '/bourbon-neat/app/assets/stylesheets')
        // path.join(nm, '/font-awesome/scss')
      ]
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(cssmin({ keepBreaks: true }))
    .pipe(gulp.dest('./'));
});

gulp.task('component-styles', ['css'], function() {
  return gulp
    .src(['components/**/*.css'])
    .pipe(stylemod())
    .pipe(gulp.dest('./components'));
});

gulp.task('index', ['html'], function() {
  return gulp
    .src('./client.html')
    .pipe(vulcanize({
      inlineScripts: true,
      inlineCss: true,
      excludes: [
        'bower_components/polymer/polymer.html',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js',
        '../../bower_components/lodash/lodash.min.js',
        '../../bower_components/showdown/dist/showdown.min.js'
      ]
    }))
    .pipe(rename(function(p) {
      p.basename = 'index';
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['lint', 'component-js', 'component-styles', 'component-html', 'index']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/**/*.scss'], ['component-styles']);
  gulp.watch(['src/**/*.jade'], ['component-html']);
  gulp.watch(['src/**/*.js'], ['component-js']);
  gulp.watch(['client.html', 'components/**/*.*'], ['index']);
});

gulp.task('default', ['build']);
