// Import important packages
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpIf = require('gulp-if')

// SASS -> CSS
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// HTML
const htmlmin = require('gulp-htmlmin');

// JavaScript / TypeScript
const buffer = require('vinyl-buffer');
const { createGulpEsbuild } = require('gulp-esbuild')

// Define important variables
const src = './src';
const dest = './dist';
const useTypeScript = false;

gulp.task('delete-dest', () => del([dest]));

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
const makeCssTask = (options) => {
    return css = () => {
        // Find SASS
        return gulp.src(`${src}/sass/**/*.{sass,scss}`)
            // Init Plumber
            .pipe(plumber())
            // Start sourcemap
            .pipe(gulpIf(options.sourcemap, sourcemaps.init()))
            // Compile SASS to CSS
            .pipe(sass.sync({ outputStyle: 'compressed' })).on('error', sass.logError)
            // Add suffix
            .pipe(rename({ basename: 'main', suffix: '.min' }))
            // Add Autoprefixer & cssNano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // Write sourcemap
            .pipe(gulpIf(options.sourcemap, sourcemaps.write('')))
            // Write everything to destination folder
            .pipe(gulp.dest(`${dest}/css`))
            // Reload page
            .pipe(browserSync.stream());
    };
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
            sortAttributes: true,
            sortClassName: true
        }))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}`));
};

const typescript = () => {
    return gulp.src(`${src}/script/main.ts`);
};

const javascript = () => {
    return gulp.src(`${src}/script/main.js`);
};

// Compile .js/.ts to minified .js
const makeScriptTask = (options) => {
    return script = () => {
        const gulpEsbuild = createGulpEsbuild({
            incremental: options.incremental
        })
    
        const sourceStream = useTypeScript ? typescript() : javascript();
    
        return sourceStream
            .pipe(gulpEsbuild({
                outfile: 'main.bundle.js',
                bundle: true,
                minify: true,
                sourcemap: options.sourcemap,
                platform: 'browser'
            }))
            .pipe(buffer())
            .pipe(gulp.dest(`${dest}/js`));
    };
};

// Copy assets
const assets = () => {
    return gulp.src(`${src}/assets/**`)
        .pipe(gulp.dest(`${dest}/assets`));
};

// Make Tasks
const cssDev = makeCssTask({ sourcemap: true })
const cssBuild = makeCssTask({ sourcemap: false })

const scriptDev = makeScriptTask({
    incremental: true,
    sourcemap: true
});
const scriptBuild = makeScriptTask({
    sourcemap: false
});

const devCompilationTasks = gulp.parallel(assets, cssDev, scriptDev, html)

// Watch changes and refresh page
const watch = () => gulp.watch(
    [`${src}/*.html`, `${src}/script/**/*.(js|ts)`, `${src}/sass/**/*.{sass,scss}`, `${src}/assets/**/*.*`],
    gulp.series('delete-dest', devCompilationTasks, reload));

// Development tasks
const dev = gulp.series('delete-dest', devCompilationTasks, serve, watch);

// Build tasks
const buildCompilationTasks = gulp.parallel(assets, cssBuild, scriptBuild, html);
const build = gulp.series('delete-dest', buildCompilationTasks);

// Default function (used when type "gulp")
exports.default = dev;
exports.dev = dev;
exports.build = build;
