import gulp from 'gulp';
import { watcher } from './gulp/tasks/watcher.js';
import { clean } from './gulp/tasks/clean.js';
import { markup } from './gulp/tasks/markup.js';
import { styles } from './gulp/tasks/styles.js';
import { otfToTtf, ttfToWoff, fonstStyle } from './gulp/tasks/fonts.js';
import { server } from './gulp/tasks/server.js';

const mainTasks = gulp.series(gulp.series(otfToTtf, ttfToWoff, fonstStyle), gulp.parallel(styles, markup));
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);

