(function() {
    'use strict';

    // ////////////////////////////////////////////////////////
    // Module Dependencies
    // ////////////////////////////////////////////////////////
    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        browserSync = require('browser-sync'),
        reload = browserSync.reload;

    // ////////////////////////////////////////////////////////
    // Gulp Tasks
    // ////////////////////////////////////////////////////////

    // ////////////////////////////////////////////////////////
    // Browser Sync
    // Sync browser with changed files without requiring a
    // page refresh.
    // ////////////////////////////////////////////////////////
    gulp.task('browser-sync', ['nodemon'], function() {
        browserSync({
            proxy: "localhost:3000", // local node app addres
            port: 5000 // use *different* port than above
        });
    });

    /// ////////////////////////////////////////////////////////
    // Nodemon
    // Server restart
    // ////////////////////////////////////////////////////////
    gulp.task('nodemon', function(cb) {
        var called = false;
        return nodemon({
                script: './bin/www',
                env: {
                    'NODE_ENV': 'development'
                },
                nodeArgs: ['--debug']
            })
            .on('start', function() {
                if (!called) {
                    called = true;
                    cb();
                }
            })
            .on('restart', function() {
                setTimeout(function() {
                    reload({
                        stream: false
                    });
                }, 500);
                console.log('Server has been restarted.');
            });
    });

    // ////////////////////////////////////////////////////////
    // Default task
    // ////////////////////////////////////////////////////////
    gulp.task('default', ['browser-sync'], function() {
        gulp.watch(['public/**/*.*', 'views/*.jade'], reload);
    });
}());