var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sym = require('gulp-sym');
var sass = require('gulp-sass');
var electron = require('electron-connect').server.create();

gulp.task('compile', ['copy-assets', 'compile-js', 'compile-html', 'symlink', 'compile-sass']);

gulp.task('copy-assets', function(){
	return gulp.src('src/**/*.json').pipe(gulp.dest('dest'));
})

gulp.task('compile-js', function(){
	return gulp.src('src/**/*.{js,jsx}')
			.pipe($.babel({
				stage: 0
			}))
			.pipe(gulp.dest('dest'));
});

gulp.task('compile-html', function(){
	return gulp.src('src/**/*.html')
				.pipe(gulp.dest('dest'));
});

gulp.task('compile-sass', function(){
	gulp.src('src/**/*.sass')
		.pipe(sass({includePaths:['node_modules']}))
		.pipe(gulp.dest('dest'));
});

gulp.task('symlink', function(){
	gulp.src('node_modules/font-awesome/fonts')
	.pipe(sym('dest/renderer/mock/fonts', {force:true}));
});

gulp.task('start', ['compile'], function(){
	electron.start();

	gulp.watch("src/**/*.{js,html}", ['compile']);
	gulp.watch("dest/main/tsukikaze.js", electron.restart);
});
