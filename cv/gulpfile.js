'use strict';

/* eslint no-var:0 */
var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
// var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var dirread = require('fs-readdir-recursive');
var eslint = require('gulp-eslint');
var filelog = require('gulp-filelog');
var ignore = require('gulp-ignore');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var serial = require('run-sequence');
var sass = require('gulp-sass');
var stylemod = require('gulp-style-modules');
var touch = require('touch');
var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');

var errcb = function(err) {
  console.error(err.stack || err.message || err);
  this.emit('end');
};

gulp.task('js', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .on('error', errcb)
    .pipe(uglify())
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

gulp.task('minify-vulcanize', function() {
  var excludes = _.map(dirread('./components').filter(function(file) {
    return file.indexOf('.html') >= 0 && file.indexOf('.min.html') === -1 && file.indexOf('-styles.html') === -1;
  }), function(file) {
    var ret = 'components/' + file.replace('.html', '.min.html');
    touch.sync(ret);
    return ret;
  });

  excludes.push('bower_components/polymer/polymer.html');
  excludes.push('bower_components/webcomponentsjs/webcomponents-lite.min.js');
  excludes.push('bower_components/lodash/lodash.min.js');
  excludes.push('bower_components/showdown/dist/showdown.min.js');

  return gulp
    .src(['components/**/*.html', '!components/**/*.min.html', '!components/**/*-styles.html'])
    .pipe(vulcanize({
      inlineScripts: true,
      inlineCss: true,
      stripComments: true,
      excludes: excludes
    }))
    .pipe(gulp.dest('./components'));
});

gulp.task('minify-rename', function() {
  return gulp
    .src(['components/**/*.html', '!components/**/*.min.html', '!components/**/*-styles.html'])
    .pipe(rename(function(p) {
      p.basename = p.basename + '.min';
    }))
    .pipe(gulp.dest('./components'));
});

gulp.task('minify', ['component-js', 'component-styles', 'component-html'], function(done) {
  serial('minify-vulcanize', 'minify-rename', done);
});

gulp.task('build', ['lint', 'minify']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/**/*.scss'], ['component-styles']);
  gulp.watch(['src/**/*.jade'], ['component-html']);
  gulp.watch(['src/**/*.js'], ['component-js']);
  gulp.watch(['components/**/*.*', '!components/**/*.min.html'], ['index']);
});

gulp.task('default', ['build']);
