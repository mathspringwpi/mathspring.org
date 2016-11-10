const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const bower = require('gulp-bower');
const notify = require('gulp-notify');
const jshint = require('gulp-jshint');
const jshintStyle = require('jshint-stylish');
const browserSync = require('browser-sync').create();

const config = {
    sassPath: 'src/stylesheets/**/*.scss',
    cssBuildPath: 'public/css',
    jsPath: 'src/js/**/*.js',
    jsBuildPath: 'public/js',
    imgPath: 'src/img/**/*.*',
    imgBuildPath: 'public/img',
    libPath: 'src/libs'
};

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.libPath));
});

gulp.task('build-css', function() {
    return gulp.src(config.sassPath)
        .pipe(sass({
            style: 'compressed',
            includePaths: [
                config.libPath + '/bootstrap-sass/assets/stylesheets'
            ],
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.cssBuildPath))
        .pipe(notify({ message: 'Building CSS complete!' }))
        .pipe(browserSync.stream());
});

gulp.task('copy-images', function() {
    return gulp.src(config.imgPath)
        .pipe(gulp.dest(config.imgBuildPath));
});

gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStyle))
    .pipe(jshint.reporter('fail'))
    .pipe(notify({ message: 'Good JavaScript style!' }));
});

gulp.task('compress-js', function() {
    return gulp.src(config.jsPath)
        .pipe(uglify())
        .pipe(gulp.dest(config.jsBuildPath));
});

gulp.task('add-libraries', function() {
  return gulp.src([config.libPath + '/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(config.jsBuildPath));
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(config.sassPath, ['build-css']);
    gulp.watch([config.jsPath, '!node_modules/**'], ['jshint', 'compress-js']);
    gulp.watch(config.imgPath, ['copy-images'])
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['bower', 'build-css', 'compress-js', 'add-libraries', 'copy-images', 'watch']);
