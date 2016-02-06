var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sym = require('gulp-sym');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var electron = require('electron-connect').server.create();
var eslint = require('gulp-eslint');

gulp.task('compile', ['copy-assets', 'compile-js', 'compile-html', 'symlink', 'compile-sass', 'concat-vendor-css']);

gulp.task('copy-assets', function(){
    return gulp.src('src/**/*.{json,css}').pipe(gulp.dest('dest'));
});

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
    .pipe(sym('dest/renderer/fonts', {force:true}));
});

gulp.task('concat-vendor-css', function(){
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('dest/renderer/static/css'));
});

gulp.task('start', ['compile'], function(){
    electron.start();

    gulp.watch("src/**/*.{js,jsx,html,sass,css}", ['compile']);
    gulp.watch("dest/main/tsukikaze.js", electron.restart);
});

gulp.task('lint', function(){
    return gulp.src(["src/**/*.{js, jsx}"])
           .pipe(eslint())
           .pipe(eslint.format())
           .pipe(eslint.failAfterError());
})
