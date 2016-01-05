'use strict';

/* eslint no-var:0 */
var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var cssmin = require('gulp-cssmin');
var data = require('gulp-data');
var eslint = require('gulp-eslint');
var fs = require('fs');
var ignore = require('gulp-ignore');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var stylemod = require('gulp-style-modules');
// var vulcanize = require('gulp-vulcanize');
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

gulp.task('lint', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

var htmlTask = function() {
  return gulp
    .src(['src/**/*.jade'])
    .pipe(data(function(file) {
      var comp = false;
      var location = _.filter(file.path.split('/'), function(p) {
        if ((comp || p.indexOf('components') === 0) && p.indexOf('.jade') === -1) {
          comp = true;
          return true;
        }
      }).join('/');

      return {
        readFile: function(name) {
          return fs.readFileSync(path.join('.', location, name), 'utf-8');
        }
      };
    }))
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
};

gulp.task('html', htmlTask);
gulp.task('html-deps', ['css', 'js'], htmlTask);

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
      ]
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(cssmin({ keepBreaks: true }))
    .pipe(gulp.dest('.'));
});

gulp.task('component-styles', ['css'], function() {
  return gulp
    .src(['components/**/*.css'])
    .pipe(stylemod())
    .pipe(gulp.dest('./components'));
});

gulp.task('build', ['lint', 'html-deps']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/**/*.scss'], ['css']);
  gulp.watch(['src/**/*.js'], ['js']);
  gulp.watch(['src/**/*.jade', 'components/**/*.css', 'components/**/*.js'], ['html']);
});

gulp.task('default', ['build']);
