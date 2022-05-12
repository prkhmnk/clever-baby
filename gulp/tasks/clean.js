import del from 'del';
import { Directories } from '../gulpconfig.js';

export const clean = () => {
  return del(Directories.build);
}