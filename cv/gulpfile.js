'use strict';

/* eslint no-var:0 */
var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
// var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var data = require('gulp-data');
var dirread = require('fs-readdir-recursive');
var eslint = require('gulp-eslint');
var fs = require('fs');
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

gulp.task('lint', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('html', ['css', 'js'], function() {
  return gulp
    .src(['src/**/*.jade'])
    .pipe(data(function(file) {
      var data = { files: {} };
      var parts = file.path.split('/components/');

      if (parts[1]) {
        var jsfile = 'components/' + parts[1].replace('.jade', '.js');
        var cssfile = 'components/' + parts[1].replace('.jade', '.css');

        if (fs.existsSync(jsfile)) {
          data.files.js = fs.readFileSync(jsfile, 'utf-8');
        }

        if (fs.existsSync(cssfile)) {
          data.files.css = fs.readFileSync(cssfile, 'utf-8');
        }
      }

      return data;
    }))
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

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

gulp.task('build', ['lint', 'html']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/**/*.scss'], ['component-styles']);
  gulp.watch(['src/**/*.jade'], ['component-html']);
  gulp.watch(['src/**/*.js'], ['component-js']);
});

gulp.task('default', ['build']);
