import $ from 'jquery';
import 'jquery-modal';

import slider from './slider';
import accordion from './accordion';
import navigation from './navigation';


$(document).ready(() => {
    navigation();
    slider();
    accordion();
});
