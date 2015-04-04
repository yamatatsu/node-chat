var gulp = require('gulp');

////////////////////
// front
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var vinylTransform = require('vinyl-transform');
var del = require('del');
var runSequence = require('run-sequence');

// 削除してくれる人
gulp.task('clean', function(cb) {
	del(['build/*'], cb);
});

// jsを作ってくれる人(browserify, babelify)
gulp.task('js', function() {
	gulp.src('./src-front/js/*.js')
		.pipe(vinylTransform(function(filename){
			return browserify(filename)
				.transform(babelify)
				.bundle();
		}))
		.pipe(gulp.dest('./build/public/js'));
});
// cssを作ってくれる人(sass)
gulp.task('css', function () {
	gulp.src('./src-front/scss/**/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('./build/public/css'));
});

// 監視→ビルドしてくれる人
gulp.task('watch', function() {
	gulp.watch('./src-front/js/**/*.js', ['js']);
	gulp.watch('./src-front/scss/**/*.sass', ['css']);
});

// ビルド。heroku用
gulp.task('deploy', function(callback) {
  return runSequence(
    'clean',
    ['js', 'css'],
    callback
  );
});

// ビルドしつつ監視
gulp.task('default', function(callback) {
  return runSequence(
    'deploy',
    'watch',
    callback
  );
});

////////////////////
// server
var nodemon = require('gulp-nodemon');
gulp.task('serve', function() {
  nodemon({script: 'index.js'})
		.on('restart', function(){console.log('restarted!')});
});
