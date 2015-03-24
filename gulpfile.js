var gulp = require('gulp');
var sass = require('gulp-sass');
//var jshint = require('gulp-jshint');
var browserify = require('browserify');
var babelify = require('babelify');
var vinylTransform = require('vinyl-transform');
var del = require('del');

gulp.task('lint', function() {
	//return gulp.src('./src-front/js/*')
	//	.pipe(jshint())
	//	.pipe(jshint.reporter('default'));
});

gulp.task('clean', function(cb) {
	return del(['build/*'], cb);
});


gulp.task('js-build', function() {
	return gulp.src("./src-front/js/*.js")
		.pipe(vinylTransform(function(filename){
			return browserify(filename)
				.transform(babelify)
				.bundle();
		}))
		.pipe(gulp.dest('./build/public/js'));
});

gulp.task('css-build', function () {
	return gulp.src('./src-front/scss/*')
		.pipe(sass())
		.pipe(gulp.dest('./build/public/css'));
});

gulp.task(
	'default',
	[
		'lint',
		'clean',
		'js-build',
		'css-build'
	],
	function() {console.log('done!!');}
);