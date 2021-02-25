'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var svgmin = require('gulp-svgmin');
var del = require('del');

gulp.task('reviveSVG', (done) => {
    del(['svg_minified/**/*.svg'], function (err, deleted) {
        console.log('deleted: ' + deleted.join(','));
    });
    gulp.src('svg/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./svg_minified'));
    done();
});

gulp.task('browser-sync', (done) => {
    browserSync({
        files: ['service-worker.js', 'js/**/*.js', '**/*.html', 'css/**/*.css'],
        server: {
            baseDir: "./"
        },
        port: 9001,
        // https: true,
        open: false
    });
    done();
});

gulp.task('default', gulp.series('reviveSVG', 'browser-sync'), (done) => {
    gulp.watch(['svg/**/*.svg'], ['reviveSVG', 'browser-sync']);
    done();
});