'use strict';

/* eslint no-var:0 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var eslint = require('gulp-eslint');
var ignore = require('gulp-ignore');
var jade = require('gulp-jade');
var lcovmerger = require('lcov-result-merger');
var newer = require('gulp-newer');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var karma = require('karma');

var errcb = function(err) {
  console.error(err.stack || err.message || err);
  this.emit('end');
};

gulp.task('js-client', function() {
  return gulp
    .src(['src/client/scripts/**/*.js'])
    //.pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', errcb)
    /*.pipe(sourcemaps.write('.', {
      sourceRoot: '.',
      sourceMappingURLPrefix: '.'
    }))*/
    .pipe(concat('client.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('js-vendor', function() {
  return gulp
    .src([
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/lodash/lodash.min.js'
    ])
    //.pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    //.pipe(sourcemaps.write('.', {
    //  sourceRoot: '.',
    //  sourceMappingURLPrefix: '.'
    //}))
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
    .src(['src/client/views/**/*.jade'])
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
  var nm = __dirname + '/node_modules';

  return gulp
    .src(['src/client/styles/**/*.scss'])
    .pipe(sass({
      indentedSyntax: false,
      sourceComments: 'normal',
      outputStyle: 'nested',
      includePaths: ['bourbon', 'bourbon-neat'].map(function(p) {
        return nm + '/' + p + '/app/assets/stylesheets';
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

gulp.task('bower', function() {
  return bower();
});

gulp.task('build', ['lint', 'js-client', 'js-vendor', 'html', 'css']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/client/styles/**/*.scss'], ['css']);
  gulp.watch(['src/client/views/**/*.jade'], ['html']);
  gulp.watch(['src/client/scripts/**/*.js'], ['js-client']);
});

gulp.task('default', ['build']);
