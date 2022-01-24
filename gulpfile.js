import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher
);

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
}

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(gulp.dest("build/img"));
}

// SVG

const svg = () => {
  return gulp.src(["source/img/**/*.svg", "!source/img/logo-*.svg", "!source/img/button-*.svg", "!source/img/intro-*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img"));
}

const sprite = () => {
  return gulp.src(["source/img/logo-*.svg", "source/img/button-*.svg", "source/img/intro-*.svg"])
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}
