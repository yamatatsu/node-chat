var gulp = require('gulp');
var sass = require('gulp-sass');
//var jshint = require('gulp-jshint');
//var browserify = require('gulp-browserify');
var babel = require('gulp-babel');

gulp.task('sass', function () {
	return gulp.src('./src-front/scss/*')
		.pipe(sass())
		.pipe(gulp.dest('./build/public/css'));
});

gulp.task('lint', function() {
	//return gulp.src('./src-front/js/*')
	//	.pipe(jshint())
	//	.pipe(jshint.reporter('default'));
});

gulp.task('js-build', function() {
	return gulp.src('./src-front/js/*')
		//.pipe(browserify({
		//	insertGlobals : true,
		//	debug : !gulp.env.production
		//}))
		.pipe(babel())
		.pipe(gulp.dest('./build/public/js'));

});

gulp.task(
	'default',
	[
		'sass',
		'lint',
		'js-build'
	],
	function() {console.log('done!!');}
);