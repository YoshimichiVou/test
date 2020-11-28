const gulpset = require('./gulpset/gulpset');

gulpset.gulp.task(
  'default',
  gulpset.gulp.series(
    'clean',
    gulpset.gulp.parallel('copy', 'eslint', 'sass-nomap', 'scripts', 'ejs'),
    'watch',
    'browsersync'
  )
);

// gulpset.gulp.task(
//   'default',
//   gulpset.gulp.series(
//     'clean',
//     gulpset.gulp.parallel('copy', 'eslint', 'imagemin', 'sass', 'scripts', 'ejs'),
//     'watch',
//     'browsersync'
//   )
// );

gulpset.gulp.task(
  'production',
  gulpset.gulp.series(
    'clean',
    gulpset.gulp.parallel('copy', 'eslint', 'sass-nomap', 'scripts', 'ejs')
  )
);
