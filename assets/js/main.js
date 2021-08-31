import $ from 'jquery';
import 'jquery-modal';
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';


import slider from './slider';
import accordion from './accordion';
import navigation from './navigation';


$(document).ready(() => {
    navigation();
    slider();
    accordion();
});
