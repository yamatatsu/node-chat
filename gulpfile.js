var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

gulp.task('serve', function() {
  nodemon({script: 'src/index.js'})
		.on('restart', function(){console.log('restarted!')});
});

gulp.task('default', function(cb) {
  runSequence('serve', cb);
});
