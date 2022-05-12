import gulp from 'gulp';
import { watcher } from './gulp/tasks/watcher.js';
import { clean } from './gulp/tasks/clean.js';
import { markup } from './gulp/tasks/markup.js';
import { server } from './gulp/tasks/server.js';

const mainTasks = gulp.parallel(markup);
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);

