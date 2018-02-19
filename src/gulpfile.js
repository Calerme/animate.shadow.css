const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs');

const gulp = require('gulp');

const concat = require('gulp-concat');
const gutil = require('gulp-util');
const header = require('gulp-header');
const postcss = require('gulp-postcss');
const rename = require('gulp-reanme');
const runSequence = require('run-sequence');

const pkg = JSON.parse(fs.readFileSync('package.json'));
const activatedAnimations = activatedAnimations();

const opts = {
  destPath: './',
  concatName: 'animate.css',

  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
    cascade: false,
  },

  minRename: {
    suffix: '.min',
  },

  banner: [
    '@charset "UTF-8";\n',
    '/*!',
    ' * <%= name %> - <%= homepage %>',
    ' */\n\n',
  ].join('\n'),
}

gulp.task('default', function () {
  runSequence('createCSS', 'addHeader');
});

gulp.task('createCSS', function () {
  return gulp
    .src(activatedAnimations)
    .pipe(concat(opts.concatName))
    .pipe(postcss([autoprefixer(opts.autoprefixer)]))
    .pipe(gulp.dest(opts.destPath))
    .pipe(postcss([cssnano({reduceIdents: {keyframes: false}})]))
    .pipe(rename(opts.minRename))
    .pipe(gulp.dest(opts.destPath));
})

gulp.task('addHeader', function () {
  return gulp
    .src('*.css')
    .pipe(header(opts.banner, pkg))
    .pipe(gulp.dest(opts.destPath));
})

function activatedAnimations() {
  var categories = JSON.parse(fs.readFileSync('animate-config.json')),
    category,
    files,
    file,
    target = ['source/_base.css'],
    count = 0;

    for (category in categories) {
      if (categories.hasOwnProperty(category)) {
        files = categories[category];

        for (file in files) {
          if (files[file]) {
            target.push('source/'+category+'/'+file+'.css');
            count += 1;
          }
        }
      }
    }

    if (!count) {
      gutil.log('No animations activated.');
    } else {
      gutil.log(count + (count > 1 ? 'animations' : 'animation') + 'activated.');
    }

    return target;
}
