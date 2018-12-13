//register components
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');


//Minifies images
gulp.task('images', function () {
    gulp.src('img/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{ removeViewBox: true }]
        }))
        .pipe(gulp.dest('dist/img'))
});

// Minifies JS
gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js/'))
});

//define plugins
gulp.task('sass', function () {
    return gulp.src('sass/**/*.sass')
        .pipe(sourcemaps.write())
        .pipe(sass({
            includePaths: ['node_modules/susy/sass'] //compile susy
        }).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('autoprefixer', function () {
    return gulp.src('/dist/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});

//define watch task
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.sass', ['sass']);
    gulp.watch('./dist/css/main.css', ['autoprefixer']);
});