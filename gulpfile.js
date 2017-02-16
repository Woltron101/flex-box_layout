'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    // sass = require('gulp-sass'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    spritesmith = require('gulp.spritesmith'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

var path = {
    dist: {
        html: {
            main: 'dist/',
            templ: 'dist/templates/',
        },
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        icons: 'dist/img/icons/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: {
            main: 'src/index.html',
            templ: 'src/templates/**/*.html'
        },
        js: 'src/js/**/*.js',
        style: {
            main: 'src/style/style.scss',
            libs: 'src/style/libs.scss'
        },
        img: 'src/img/**/*.*',
        icons: './src/img/icons/*.png',
        fonts: 'src/fonts/*.*'
    },
    watch: {
        html: {
            main: 'src/index.html',
            templ: 'src/templates/**/*.html'
        },
        js: {
            main: 'src/js/**/*.js',
            libs: 'src/js/**/*.js'
        },
        style: {
            main: 'src/style/*.scss',
            libs: 'src/style/libs.scss'
        },
        img: 'src/img/**/*.*',
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/*.*'
    },
    clean: './dist'
};

gulp.task('webserver', function() {
    connect.server({
        root: './dist/',
        livereload: true,
        port: 8080
    });
});


gulp.task('html:main', function() {
    gulp.src(path.src.html.main)
        .pipe(gulp.dest(path.dist.html.main))
        .pipe(connect.reload());
});

gulp.task('html:templ', function() {
    gulp.src(path.src.html.templ)
        .pipe(gulp.dest(path.dist.html.templ))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src([
            'src/js/main.js'
            // 'src/js/controllers/mainCtrl.js',
            // 'src/js/controllers/pokemonsCtrl.js',
            // 'src/js/controllers/favoritesCtrl.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(connect.reload());
});

gulp.task('style', function() {
    gulp.src(path.src.style.main)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(compass({
            css: 'dist/css',
            sass: 'src/style'
        }))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(prefixer(['last 15 versions', '> 1%', 'ie 9', 'ie 8'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(connect.reload());
});

gulp.task('style:libs', function() {
    gulp.src(path.src.style.libs)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(compass({
            css: 'dist/css',
            sass: 'src/style'
        }))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(prefixer(['last 15 versions', '> 1%', 'ie 9', 'ie 8'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(connect.reload());
});
gulp.task('fonts', function() {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(connect.reload());
});
gulp.task('img', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
        .pipe(connect.reload());
});


gulp.task('bootstrap:buid', function() {
    return gulp.src('src/bootstrap/less/bootstrap.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('_bootstrap.scss'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/style/'));
})

gulp.task('sprite', function() {
    var spriteData = gulp.src('./src/img/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            padding: 10
        }))
    spriteData.css
        .pipe(replace('url(sprite.png)', 'url(../img/sprite.png)'))
        .pipe(rename("style/_main_sprite.scss"))
        .pipe(gulp.dest("src/"));
    spriteData.img
        .pipe(gulp.dest('./src/img/'))
        .pipe(connect.reload());

});
gulp.task('copy', function() {
    gulp.src('src/bower_components/**/*.*')
        .pipe(gulp.dest('dist/bower_components/'))
        .pipe(connect.reload());

});
gulp.task('video', function() {
    gulp.src('src/media/**/*.*')
        .pipe(gulp.dest('dist/media/'))
        .pipe(connect.reload());

});

// gulp.task('replace', function() {
//     gulp.src('src/style/sprite.css')
//         .pipe(replace('url(sprite.png)', 'url(../img/sprite.png)'))
//         .pipe(gulp.dest('src/style'));
// });
// gulp.task('rename', function() {
//     gulp.src('src/style/sprite.css')
//         .pipe(rename("style/_main_sprite.scss"))
//         .pipe(gulp.dest("src/"));
// });


gulp.task('sprites', [
    'sprite',
    // 'replace',
    // 'rename',
    'style'
]);

gulp.task('build', [
    'html:main',
    'html:templ',
    'js',
    'style',
    'style:libs',
    'fonts',
    'bootstrap:buid',
    'img',
    'sprites',
    'video',
    'copy'
]);

gulp.task('watch', function() {
    gulp.watch(path.watch.style.main, ['style']);
    gulp.watch(path.watch.style.libs, ['style:libs']);
    gulp.watch(path.watch.js.main, ['js']);
    gulp.watch(path.watch.html.main, ['html:main']);
    gulp.watch(path.watch.html.templ, ['html:templ']);
    gulp.watch(path.watch.fonts, ['fonts']);
    gulp.watch('src/bootstrap/less/*.less', ['bootstrap:buid']);
    gulp.watch(path.watch.img, ['img']);
    gulp.watch(path.watch.icons, ['sprites']);
    gulp.watch('src/media/**/*.*', ['video']);
    gulp.watch('src/bower_components/**/*.*', ['copy']);
});
gulp.task('default', ['build', 'webserver', 'watch']);


















function solution(a) {
    var sumArr = [];
    a.forEach(function(element, index) {
        var sum1 = 0,
            sum2 = 0;
        for (i = 0; i < index; i++) {
            sum1 += a[i];
        }
        sumArr.push(sum1);
    });
    console.log(sumArr);
}
