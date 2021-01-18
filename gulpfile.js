// Import important packages
const gulp = require('gulp');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');

// SASS -> CSS
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// HTML
const htmlmin = require('gulp-htmlmin');

// JavaScript / TypeScript
const terser = require('gulp-terser-js');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// Define important variables
const src = './src';
const dest = './dist';

// Reload the browser
const reload = (done) => {
    browserSync.reload();
    done();
};

// Serve the dev-server in the browser
const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: `${dest}`
        }
    });
    done();
};

// Compile SASS to CSS with gulp
const css = () => {
    // Find SASS
    return gulp.src(`${src}/sass/**/*.sass`)
        // Init Plumber
        .pipe(plumber())
        // Start sourcemap
        .pipe(sourcemaps.init())
        // Compile SASS to CSS
        .pipe(sass.sync({ outputStyle: "compressed" })).on('error', sass.logError)
        // Add suffix
        .pipe(rename({ basename: 'main', suffix: ".min" }))
        // Add Autoprefixer & cssNano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Write sourcemap
        .pipe(sourcemaps.write(''))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}/css`))
        // Reload page
        .pipe(browserSync.stream());
};

// Compile .html to minified .html
const html = () => {
    // Find HTML
    return gulp.src(`${src}/*.html`)
        // Init Plumber
        .pipe(plumber())
        // Compile HTML to minified HTML
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            sortAttributes: true,
            sortClassName: true
        }))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}`));
};

// Compile .js to minified .js
const script = () => {
    return browserify(`${src}/js/main.js`, { debug: true })
        .transform('babelify', {
            presets: ['babel-preset-env'],
            plugins: ['babel-plugin-transform-runtime']
        }).plugin('tinyify')
        .bundle()
        .pipe(source(`main.bundle.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dest}/js`));
};

// Copy assets
const assets = () => {
    return gulp.src(`${src}/assets/**`)
        .pipe(gulp.dest(`${dest}/assets`));
};

// Watch changes and refresh page
const watch = () => gulp.watch(
    [`${src}/*.html`, `${src}/js/**/*.js`, `${src}/sass/**/*.sass`, `${src}/assets/**/*.*`],
    gulp.series(assets, css, script, html, reload));

// Development tasks
const dev = gulp.series(assets, css, script, html, serve, watch);

// Build tasks
const build = gulp.series(css, script, html, assets);

// Default function (used when type "gulp")
exports.default = dev;
exports.dev = dev;
exports.build = build;
