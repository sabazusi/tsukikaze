var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('compile', ['compile-js', 'compile-html']);

gulp.task('compile-js', function(){
	return gulp.src('src/**/*.{js,jsx}')
			.pipe($.babel({
				stage: 0
			}))
			.pipe(gulp.dest('app'));
});

gulp.task('compile-html', function(){
	return gulp.src('src/**/*.html')
			.pipe(gulp.dest('app'));
});
