var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    csscomb = require('gulp-csscomb');

// add Error handling method for plumber plugin
var onError = function (err) {
  gutil.beep();
};

// compile SASS, autoprefix & minify css
gulp.task('styles', function() {
    return gulp.src(['sass/*.scss', 'sass/*.sass'])
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(compass({
            css: 'css',
            sass: 'sass',
            image: 'img',
            font: 'font',
            comments: true,
            style: 'nested'
        })) // compile SASS
        .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(livereload(server))
});

// uglify JS
gulp.task('uglify', function() {
  return gulp.src([
        'bower_components/iOS-Orientationchange-Fix/ios-orientationchange-fix.js',
        'bower_components/jquery.cookie/jquery.cookie.js',
        'bower_components/jquery.fitvids/jquery.fitvids.js',
        'bower_components/jquery-placeholder/jquery.placeholder.js',
        'bower_components/picturefill/picturefill.js',
        'bower_components/superfish/dist/js/superfish.js',
        'bower_components/svgeezy/svgeezy.js',
        'build/svgs/grunticon.loader.js',
        'js/*.js',
        '!js/*.min.js'
    ])
    .pipe(plumber({
            errorHandler: onError
        }))
    .pipe(rename({ suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(livereload(server))
});

// php files
gulp.task('php', function() {
    return gulp.src('*.php')
        .pipe(livereload(server));
});

// html files
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(livereload(server));
});

// clean target directory
gulp.task('clean:css', function() {
  del(['css/**'], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

// watch for updates and update livereload server
gulp.task('watch', function() {

    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        }

        gulp.watch(['sass/**/*.scss', 'sass/**/*.sass'], ['styles']);
        gulp.watch('*.php', ['php']);
        gulp.watch('*.html', ['html']);
        gulp.watch('js/*.js', ['uglify']);
    });
});

// default task
gulp.task('default', ['clean:css'], function() {
    gulp.start('styles', 'uglify');
});
