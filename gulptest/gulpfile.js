// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

//browserSync
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        startPath: "index.html",
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch(["./*.html", "./js/*.js"]).on('change', browserSync.reload);
});

// 默认任务
/*gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});*/
gulp.task('default', ['serve']);




//multiple sprite
var fs = require('fs');
var gulpif = require('gulp-if');
var _ = require('lodash');

gulp.task('sprites', function () {

    var sprite = require('css-sprite').stream;
    var folders = fs.readdirSync('./images/sprites');

    _.each(folders, function(folder) {

        if (folder[0] === '.') {
            return;
        }

        return gulp.src('./images/sprites/' + folder + '/*.png')
            .pipe(sprite({
                name: 'sprite-' + folder + '.png',
                style: '_sprite-' + folder + '.scss',
                cssPath: '/images',
                prefix: folder + '-sprite',
                processor: 'scss',
                orientation: 'binary-tree'
            }))
            .pipe(gulpif('*.png', gulp.dest('./images/'), gulp.dest('./css/')));

    });
});