import gulp from 'gulp';
import { Directories } from '../gulpconfig.js';
import { markup } from './markup.js';

export const watcher = () => {
  gulp.watch(`${Directories.source}/pug/**/*.pug`, markup);
}
