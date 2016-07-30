var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass"),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

// build, prefix and reload css
gulp.task('build:css', function() {
	return gulp
	.src([
		'src/assets/scss/wordr.scss'
	])
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss([
		//atImport,
		autoprefixer({
			browsers: ['last 5 versions', 'iOS 8']
		})
	]))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browserSync.stream());
});

// watch scss and run build:css
gulp.task('watch:css', function() {
	gulp.watch('src/assets/scss/**/*', ['build:css']);
});


gulp.task('watch:js', function() {
	gulp.watch('src/assets/js/**/*', ['copy']);
});

gulp.task('watch:app', function() {
	gulp.watch('src/index.html', ['copy']);
});

gulp.task('copy', function() {
	return gulp
	.src([
		'src/index.html',
		'src/assets/**/*'
	])
	.pipe(gulp.dest('dist/'));
});

gulp.task('sync', function() {
	browserSync.init({
		startPath: '',
		server: {
			baseDir: 'dist',
			index: 'index.html',
			// routes: {
			// 	'/src' : '/dist'
			// }
		}
	})
});

gulp.task('default', ['watch:css', 'watch:js', 'watch:app', 'copy', 'sync']);
