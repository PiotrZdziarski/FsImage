var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('serve', function () {

    browserSync({
        server: 'src'
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch('src/js/**/*.js', ['reload', 'js']);
    gulp.watch('src/*.html', ['reload']);
});


gulp.task('sass', function () {
    return gulp.src('src/scss/root.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('js', function () {
    //   return gulp.src('src/js/**/*.js')
    // //      .pipe(concat('app.js'))
    //       .pipe(browserify({
    //           debug: true
    //       }))
    //       .pipe(gulp.dest('src'));
    browserify({
        entries: [
            'src/js/index.js',
            'src/js/renderDOM.js',
            'src/js/loadSource.js',
            'src/js/changeSlideByDragging.js'
        ],
        debug: true
    })
        .bundle()
        .on('error', function(err){
            // print the error (can replace with gulp-util)
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log(err.message);
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            // end this stream
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('src'))
});

gulp.task('default', ['serve']);

