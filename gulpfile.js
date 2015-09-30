var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sym = require('gulp-sym');

gulp.task('compile', ['compile-js', 'compile-html', 'symlink']);

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

gulp.task('symlink', function(){
	gulp.src('node_modules/font-awesome/fonts')
	.pipe(sym('app/renderer/fonts', {force:true}));
});
