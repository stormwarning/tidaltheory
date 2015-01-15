'use strict';

// DEPENDENCIES =======================================================
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;


// FILE PATHS =========================================================
var source = {

  styles : 'source/styles/**/*.scss',
  scripts : 'source/scripts/*.js',
  images : 'source/images/*.{png,jpg,gif}',
  svgs : 'source/images/*.svg'

};
var assets = {

  styles : 'assets/styles',
  scripts : 'assets/scripts',
  images : 'assets/images'

};


// AUTOPREFIXER CONFIG ================================================
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


// COMPILE STYLESHEETS ================================================
gulp.task('styles', function () {

  return gulp.src('source/styles/*.scss')
    .pipe($.changed('styles', {
      extension: '.scss'
    }))
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'SASS error:')
    }))
    .pipe($.autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.csso())
    .pipe(gulp.dest(assets.styles))
    .pipe($.size({title: 'styles'}));

});


// LINT & CONCATENATE JS ==============================================
gulp.task('scripts', function () {

  return gulp.src(source.scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(concat('scripts.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(assets.scripts))
    .pipe($.notify('Scripts task completed'));

});


// OPTIMISE IMAGES ====================================================
gulp.task('images', function () {

  return gulp.src(source.images)
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe($.notify('Images task completed'))
    .pipe(gulp.dest(source.images));

});


// WATCH FOR CHANGES AND RELOAD =======================================
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: '⎋',
    server: './'
  });

  gulp.watch(['**/*.html'], reload);
  gulp.watch([source.styles], ['styles', reload]);
  gulp.watch([source.scripts], ['scripts']);
  gulp.watch([source.images], ['images', reload]);
});
