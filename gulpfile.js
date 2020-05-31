let gulp       	 = require('gulp'), 
	sass         = require('gulp-sass'), 
	browserSync  = require('browser-sync'), 
	concat       = require('gulp-concat'), 
	uglify       = require('gulp-uglifyjs'), 
	cssnano      = require('gulp-cssnano'), 
	rename       = require('gulp-rename'), 
	del          = require('del'), 
	cache        = require('gulp-cache'), 
	autoprefixer = require('gulp-autoprefixer'),
	pug 		 = require('gulp-pug'),
	babel 		 = require('gulp-babel');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('js', function (){
    return gulp.src('app/js/main.js')
        .pipe(babel())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function() {
	return gulp
    .src("app/*.pug")
    .pipe(pug())
	.pipe(gulp.dest("app"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function () {
	return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
	  "node_modules/bootstrap/dist/css/bootstrap.min.css",
	  "node_modules/slick-carousel/slick/slick.css",
	  "node_modules/slick-carousel/slick/slick-theme.css"
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/sass"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});



gulp.task('scripts', function() {
	return gulp.src([ 
		'app/libs/jquery/dist/jquery.min.js', 
		'node_modules/slick-carousel/slick/slick.min.js'
		])
		.pipe(concat('libs.min.js')) 
		.pipe(uglify()) 
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('css-libs', function() {
	return gulp.src('app/sass/libs.sass') 
		.pipe(sass()) 
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('clean', async function() {
	return del.sync('dist');
});


gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); 
	gulp.watch('app/*.pug', gulp.parallel('pug')); 
	gulp.watch(['app/js/main.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); 
});
gulp.task('default', gulp.parallel('css-libs','css','sass', 'js','scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('clean', 'sass', 'scripts'));