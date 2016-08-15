var gulp = require("gulp"),
    gutil = require("gulp-util"),
    gulpif = require("gulp-if"),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    concat = require('gulp-concat');
    ngAnnotate = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache')


var env,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || "development";

if (env==='development') {
  outputDir = 'app/';
  sassStyle = 'expanded';
} else {
  outputDir = 'app/dist/';
  sassStyle = 'compressed';
}

jsSources = [
  'components/js/app.js',
  'components/js/controllers.js',
  'components/js/directives.js',
  'components/js/filters.js',
  'components/js/services.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = ["components/phones/*.json"];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    //.pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    //.pipe(connect.reload())
});



gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('components/phones/*.json', ['json']);
  gulp.watch('components/partials/*.html', ['templatecache'])
});

// gulp.task('connect', function() {
//   connect.server({
//     root: outputDir,
//     livereload: true
//   });
// });

gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    //.pipe(connect.reload())
});


gulp.task('json', function() {
  gulp.src('components/phones/*.json')
    .pipe(gulpif(env === 'production', jsonminify()))
    .pipe(gulp.dest(outputDir + 'phones'))
    //.pipe(connect.reload())
});


gulp.task('templatecache', function (done) {
    gulp.src('components/partials/*.html')
      .pipe(templateCache({standalone:true}))
      .pipe(gulp.dest(outputDir + 'js'))
      .on('end', done);
  });

gulp.task('default', ['html', 'json', 'templatecache', 'js', 'compass', 'watch']);
