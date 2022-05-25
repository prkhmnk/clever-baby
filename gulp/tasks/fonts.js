import gulp from 'gulp';
import plumber from 'gulp-plumber';
import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import notify from 'gulp-notify';
import { Directories } from '../gulpconfig.js';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return gulp.src(`${Directories.source}/fonts/*.otf`, {})
    .pipe(plumber(
      notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      }))
    )
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Выгружаем в исходную папку
    .pipe(gulp.dest(`${Directories.source}/fonts/`))
}
export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return gulp.src(`${Directories.source}/fonts/*.ttf`, {})
    .pipe(plumber(
      notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      }))
    )
    // Конвертируем в .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    // Выгружаем в папку с результатом
    .pipe(gulp.dest(`${Directories.build}/fonts`))
    // Ищем файлы шрифтов .ttf
    .pipe(gulp.src(`${Directories.source}/fonts/*.ttf`))
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    // Выгружаем в папку с результатом
    .pipe(gulp.dest(`${Directories.build}/fonts`))
    // Ищем файлы шрифтов .woff и woff2
    .pipe(gulp.src(`${Directories.source}/fonts/*.{woff,woff2}`))
    // Выгружаем в папку с результатом
    .pipe(gulp.dest(`${Directories.build}/fonts`));
}
export const fonstStyle = () => {
  let fontsFile = `${Directories.source}/sass/global/_fonts.scss`;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(`${Directories.build}/fonts`, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log('Файл scss/fonts/fonts.scss уже существует. Для обновления файла нужно его удалить!');

      }
    } else {
      // Если шрифтов нет
      fs.unlink(fontsFile, cb)
    }
  });
  return gulp.src(`${Directories.source}`);
}
function cb() { }
