// присваиваем src и dest возможности галпа
const { src, dest, watch, parallel, series } = require('gulp');
// передает в константу функционал плагина
const scss = require('gulp-sass')(require('sass'));
// именует .min.css и собирает js
const concat = require('gulp-concat');
// добавляет префиксы для распознавания всеми браузерами например display:grid;
const autoprefixer = require('gulp-autoprefixer');
// делает minjs
const uglify = require('gulp-uglify');
// минификация картинок плагин imagemin
const imagemin = require('gulp-imagemin');
// svg-sprite
const svgSprite = require('gulp-svg-sprite');
// Дополнение к функции спрайтов svg-sprite при использовании gulp-cheerio
const cheerio = require('gulp-cheerio');
// В некоторых случаях при использовании плагина gulp-cheerio может возникать ошибка, связанная с заменой символа ">". В таком случае можно подключить плагин  gulp-replace
const replace = require('gulp-replace');
// плагин gulp-file-include (собирает все html в один)
const fileInclude   = require('gulp-file-include');
// перезаписывает dist (удаляет старые файлы)
const del = require('del');
// перевод в woff
const ttf2woff = require('gulp-ttf2woff');
// перевод в woff2
const ttf2woff2 = require('gulp-ttf2woff2');
// автоматическое обновление браузера
const browserSync = require('browser-sync').create();

// функция для работы browser-sync
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false   // убирает окошко справа при автообновлении
  }) 
}

// функция для деления html на части с помощью gulp-file-include
const htmlInclude = () => {
  return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы													
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file',    // включить файл относительно каталога, в котором находится файл (пример)
  }))
  .pipe(dest('app'))      // указываем, в какую папку поместить готовый файл html
  .pipe(browserSync.stream());
}

//функция переводит из scss в css 
function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({outputStyle: 'expanded'}))  //compressed для min файла 
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 versions'],
    grid: true
  }))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())  // будет добавлять стили без перезагрузки
}

// функция для скриптов
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))  // происходит конкатинация js файлов 
  .pipe(uglify())               // делает минифицированным
  .pipe(dest('app/js'))         // сохраняется в указ. пути
  .pipe(browserSync.stream())   // здесь уже будет перезагружать страницу а не добавлять стили как для css 
}

// функция svgSprites
function svgSprites() {
  return src('app/images/icons/*.svg') // выбираем в папке с иконками все файлы с расширением svg
    .pipe(cheerio({
      run: ($) => {
          $("[fill]").removeAttr("fill"); // очищаем цвет у иконок по умолчанию, чтобы можно было задать свой
          $("[stroke]").removeAttr("stroke"); // очищаем, если есть лишние атрибуты строк
          $("[style]").removeAttr("style"); // убираем внутренние стили для иконок
      },
      parserOptions: { xmlMode: true },
    })
    )
    .pipe(replace('&gt;','>')) // боремся с заменой символа 
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', // указываем имя файла спрайта и путь
          },
        },
      })
    )
		.pipe(dest('app/images')); // указываем, в какую папку поместить готовый файл спрайта
}

// функция конвертирования шрифтов
function fonts() {
  src('app/fonts/**/*.*')
  .pipe(ttf2woff())
  .pipe(dest('app/fonts'))
  .pipe(dest('dist/fonts'))

  return src('app/fonts/**/*.*')
  .pipe(ttf2woff2())
  .pipe(dest('app/fonts'))
  .pipe(dest('dist/fonts'))
}

// функция images
function images() {
  return src('app/images/**/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),                  // качество сжатия для разных форматов
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(dest('dist/images'))
}

// берем и переносим все нужные файлы в dist а ненужные удаляем
function build() {
 return src([
   'app/**/*.html',
   'app/css/style.min.css',
   'app/js/main.min.js'
 ], {base: 'app'})    // чтобы перенеслись также как хранятся в app
 .pipe(dest('dist'))
}

// удаляет dist 
function cleanDist() {
  return del('dist')
}

// функция для автоматического отслеживания и изменения в опр. файлы 
function watching() {
  watch(['app/html/**/*.html'], htmlInclude);   // отслеживаниt всех файлов .html и подпапок внутри папки "html"
  watch(['app/fonts/**/*.ttf'], fonts);
  watch(['app/images/icons/*.svg'], svgSprites);
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload); 
}


exports.htmlInclude = htmlInclude; //экспорт функции htmlInclude
exports.styles = styles; // как раз производит экспорт из scss в css 
exports.scripts = scripts;  
exports.browsersync = browsersync;  
exports.watching = watching; // отслеживает и автоматически обновляет css
exports.svgSprites = svgSprites;
exports.fonts = fonts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, fonts, images, build);   //записывает три задачи в одну коману build при итоговой сборке

exports.default = parallel(htmlInclude, svgSprites, styles, scripts, browsersync, watching);   // запускает по дефолту все что мы внесли(при прописи gulp)