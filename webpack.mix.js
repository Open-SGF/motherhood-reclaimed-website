const mix = require('laravel-mix');

mix.js('assets/js/main.js', 'web')
    .sass('assets/scss/main.scss', '')
    .setPublicPath('web')
    .extract(['jquery'])
    .sourceMaps()
    .version();
