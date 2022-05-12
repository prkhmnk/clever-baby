import gulp from 'gulp';
import pug from 'gulp-pug';
import replace from 'gulp-replace';
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from 'browser-sync';
import { Directories } from '../gulpconfig.js';

export const markup = () => {
  return gulp.src(`${Directories.source}/pug/*.pug`)
    .pipe(plumber(
      notify.onError({
        title: "Pug",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(replace(/@img\//g, 'img/'))
    .pipe(pug({
      pretty: true, // Сжатие
      verbose: true // Показывать в терминале, какой файл обработан
    }))
    .pipe(gulp.dest(Directories.build))
    .pipe(browsersync.stream());
};