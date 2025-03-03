import gulp from 'gulp'; // Основной модуль
import { path } from './gulp/config/path.js'; // Импорт путей

// Глобальная переменная в которую передаем значения
global.app = {
  path: path,
  gulp: gulp,
}

// Импорт задач
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { img } from "./gulp/tasks/img.js";
import { svg } from "./gulp/tasks/svgSprite.js";
import { htaccess } from "./gulp/tasks/htaccess.js";

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, img);
  gulp.watch(path.watch.svg, svg);
}

const svgSprite = gulp.series(svg);


// базовые задачи + svgSprite.js
const baseTasks = gulp.series(svgSprite, gulp.parallel(html, scss, js, img, svg))

const dev = gulp.series(reset, htaccess, baseTasks, watcher)

gulp.task('default', dev);