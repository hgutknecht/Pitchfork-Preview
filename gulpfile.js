var gulp  = require('gulp')
  , babel = require('gulp-babel');

// Gulp plumber error handler
var onError = function(err) {
  console.log(err);
}

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['process_babel', 'watch']);

// Run all js through babel to transform
gulp.task('process_babel', function() {
  return gulp.src('public/js/jsx/app.js')
        .pipe(babel())
        .pipe(gulp.dest('public/js'));
});

// This handles watching and running tasks as well as telling our LiveReload server to refresh things
gulp.task('watch', function() {

  // Whenever a stylesheet is changed in instyle desktop theme, recompile
  gulp.watch('public/js/jsx/app.js', ['process_babel']);

});
