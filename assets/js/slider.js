import $ from 'jquery';
import 'slick-carousel';

export default function() {
    let $el = $('.js-slider');

    $el.slick({
        accessibility: true,
        autoplaySpeed: 4000,
        autoplay: true,
        arrows: true,
        draggable: true,
        dots: false,
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
    });
}
