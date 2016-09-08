const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha-co');
const csso = require('gulp-csso');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const nodemon = require('nodemon');
const webpack = require('webpack-stream');
const path = require('path');
const runSequence = require('run-sequence');
const packageJson = require('./package.json');
const swPrecache = require('sw-precache');

const rootDir = './public';

const env = require('./config/connections').env;
const webpackConfig = (env === 'production') ?
  require('./webpack.prod.config.js') : require('./webpack.dev.config.js');

require('babel-core/register');
require('babel-polyfill');

function writeServiceWorker(dir, handleFetch, cb) {
  const config = {
    cacheId: packageJson.name,
    handleFetch,
    staticFileGlobs: [
      `${dir}/index.html`,
      `${dir}/app.js`,
      `${dir}/resources/style/main.css`,
      `${dir}/resources/images/menu.svg`,
    ],
    stripPrefix: `${dir}/`,
    verbose: true,
  };

  swPrecache.write(path.join(dir, 'service-worker.js'), config, cb);
}

gulp.task('css', () =>
  gulp.src('./app/resources/style/**/*.scss')
    .pipe(
      sass({
        includePaths: ['./app/resources/style'],
        errLogToConsole: true,
      }))
    .pipe(csso())
    .pipe(gulp.dest(`${rootDir}/resources/style/`))
);

gulp.task('html', () =>
  gulp.src('./app/*.html')
    .pipe(gulp.dest(rootDir))
);

gulp.task('image', () =>
  gulp.src('./app/resources/images/*.+(png|jpg|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest(`${rootDir}/resources/images/`))
);

gulp.task('watch', (cb) => {
  gulp.watch('./app/resources/style/**/*.scss', ['css']);
  gulp.watch('./app/*.html', ['html']);
  gulp.watch('./app/**/*.js', ['bundle']);
  cb();
});

gulp.task('bundle', () =>
  gulp.src('./app/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(rootDir))
);

gulp.task('test', () =>
  gulp.src('tests/*.test.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(mocha({
      reporter: 'Spec',
    }))
);

gulp.task('lint', () =>
  gulp.src(['./app/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failAfterError())
);

gulp.task('generate-service-worker', ['bundle', 'css', 'html', 'image'], (cb) => {
  writeServiceWorker(rootDir, (env === 'production'), cb);
});

gulp.task('default', (cb) => {
  runSequence('generate-service-worker', 'watch', () => {
    nodemon({
      script: './server.js',
      ignore: ['./public/'],
    });
    cb();
  });
});
