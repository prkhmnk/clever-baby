import browsersync from 'browser-sync';
import { Directories } from '../gulpconfig.js';

export const server = (done) => {
  browsersync.init({
    server: {
      baseDir: `${Directories.build}`
    },
    cors: true,
    notify: false,
    ui: false,
    port: 3000
  });
}