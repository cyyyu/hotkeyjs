'use strict'

let gulp = require('gulp')
let gulpCoffee = require('gulp-coffee')
let gulpUglify = require('gulp-uglify')
let gulpRename = require("gulp-rename")
let gulpJshint = require('gulp-jshint')

gulp.task('jshint', () => {
    gulp.src(['./dest/*.js'])
        .pipe(gulpJshint())
        .pipe(gulpJshint.reporter('default'));
})

gulp.task('coffee', () => {
	gulp.src('./src/*.coffee')
		.pipe(gulpCoffee({
			bare: false
		}))
		.pipe(gulp.dest('./dest'));
})

gulp.task('coffee:min', () => {
	gulp.src('./src/*.coffee')
		.pipe(gulpCoffee({
			bare: false
		}))
		.pipe(gulpUglify())
		.pipe(gulpRename({
			suffix: ".min",
			extname: ".js"
		}))
		.pipe(gulp.dest('./dest'));
})

gulp.task('watch', ['coffee', 'coffee:min'], () => {
	gulp.watch('./src/*.coffee', ['coffee', 'coffee:min'])
})

gulp.task('default', ['coffee', 'coffee:min'])

process.on('uncaughtException', (err) => {
	console.log(err);
})
