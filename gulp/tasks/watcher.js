import gulp from 'gulp';
import { Directories } from '../gulpconfig.js';
import { markup } from './markup.js';
import { styles } from './styles.js';

export const watcher = () => {
  gulp.watch(`${Directories.source}/pug/**/*.pug`, markup);
  gulp.watch(`${Directories.source}/sass/**/*.scss`, styles);
}
