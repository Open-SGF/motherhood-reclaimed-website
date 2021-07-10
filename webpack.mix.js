const mix = require('laravel-mix');

mix.js('assets/js/main.js', 'web')
    .sass('assets/scss/main.scss', '')
    .setPublicPath('web')
    .extract(['jquery'])
    .sourceMaps()
    .version()
    .disableSuccessNotifications()
    .browserSync({
        proxy: 'localhost:8000',
        files: ['templates/**/*', 'web/*.css', 'web/*.js'],
        open: false,
    });
