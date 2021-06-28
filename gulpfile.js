const gulp = require("gulp");
const { parallel } = require("gulp");
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

function css() {
  return gulp
    .src('./scss/*.scss')
    .pipe(sass({outputStyle: 'compact', precision: 10})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./docs/assets/css'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./docs/assets/css'));
}

function web() {
  return gulp
    .src('./pug/!(_)*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./docs'));
}

function watch() {
  gulp.watch('./**/*.scss', css);
  gulp.watch('./**/*.pug', web);
}

exports.watch = watch;
exports.css = css;
exports.web = web;
exports.default = parallel(web, css);
