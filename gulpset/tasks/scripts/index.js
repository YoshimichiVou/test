const gulpset = require('./../../gulpset');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const logger = require('gulplog');
const babel = require('gulp-babel');

// @verbose
gulpset.gulp.task('scripts', cb => gulpset.tasks.scripts(cb));
gulpset.gulp.task('scripts-minify', cb => gulpset.tasks.scripts(cb, true));

gulpset.confs.scripts = {
  src: `${gulpset.paths.src}**/*.{js,jsx}`,
  dest: gulpset.paths.dest
};

gulpset.tasks.scripts = (callback, minify = false) => {
  const conf = gulpset.confs.scripts || {};
  let firstBuildReady = false;

  const done = function (err, stats) {
    if (!firstBuildReady) {
      callback();
    }
    firstBuildReady = true;

    logger[stats.hasErrors() ? 'error' : 'info'](
      stats.toString({
        chunks: false, // Makes the build much quieter
        modules: false,
        colors: true // Shows colors in the console
      })
    );

    if (typeof gulpset.reload === 'function') {
      gulpset.reload();
    }
  };

  // const config = conf || gulpset.confs.scripts || {};
  return gulp
    .src([conf.src, `!${gulpset.paths.src}assets/js/vendor/**/*`])
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(gulp.dest(conf.dest));
};
