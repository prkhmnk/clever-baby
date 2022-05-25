import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import browsersync from 'browser-sync';
import { Directories } from '../gulpconfig.js';

export const styles = () => {
  return gulp.src(`${Directories.source}/sass/style.scss`, { sourcemaps: true })
    .pipe(plumber(
      notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>'
      })))
    .pipe(sass().on('error', sass.logError))
    .pipe(groupCssMediaQueries())
    .pipe(postcss([
      autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true
      }),
      csso()
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${Directories.build}/css`, { sourcemaps: '.' }))
    .pipe(browsersync.stream());
}
