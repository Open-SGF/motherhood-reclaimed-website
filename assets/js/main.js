import $ from 'jquery';
import 'jquery-modal';
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';


import slider from './slider';
import accordion from './accordion';
import { navToggle, throttleNav } from './navigation';


$(document).ready(() => {
    navToggle();
    throttleNav();
    slider();
    accordion();
});
