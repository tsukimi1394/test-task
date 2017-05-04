var gulp         = require('gulp'),
postcss      = require('gulp-postcss'),
sass         = require('gulp-sass'),
autoprefixer = require('autoprefixer'),
browser      = require('browser-sync'),
sourcemaps   = require('gulp-sourcemaps'),
pug          = require('gulp-pug'),
gcmq          = require('gulp-group-css-media-queries');

gulp.task('views', function buildHTML() {
  return gulp.src('views/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('build:sass', function () {
 return gulp.src('scss/**/*.scss')
 .pipe(sourcemaps.init())
 .pipe(sass({ 
  includePaths: ['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src']
}).on('error', sass.logError))
 .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest('./css'))
 .pipe(browser.stream({match: '**/*.css'}));
});

 // Starts a BrowerSync instance
 gulp.task('serve', ['build:sass','views'], function(){
   browser.init({
     server: {
       baseDir: "./",
     }
   });
 });

 // Runs all of the above tasks and then waits for files to change
 gulp.task('default', ['serve'], function() {
   gulp.watch(['scss/**/*.scss'], ['build:sass']);
   gulp.watch(['views/**/*.pug'], ['views']);  
   gulp.watch('./**/*.html').on('change', browser.reload);
 });