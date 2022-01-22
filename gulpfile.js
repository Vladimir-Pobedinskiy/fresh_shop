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
// перезаписывает dist (удаляет старые файлы)
const del = require('del');
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
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload); // спросить про chenche
}


exports.styles = styles; // как раз производит экспорт из scss в css 
exports.scripts = scripts;  
exports.browsersync = browsersync;  
exports.watching = watching; // отслеживает и автоматически обновляет css
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);   //записывает три задачи в одну коману build при итоговой сборке

exports.default = parallel(styles, scripts, browsersync, watching);   // запускает по дефолту все что мы внесли(при прописи gulp)