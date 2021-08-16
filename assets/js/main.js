import $ from 'jquery';
import 'jquery-modal';
import BadgerAccordion from 'badger-accordion';
import 'slick-carousel';

/* Code for the BadgerAccordion */
const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);
});

/* Code for the Slick Carousel/Slider, based on https://jimfrenette.com/2019/04/slick-carousel-responsive-slides-to-show/ */
    let $el = $('.js-slider');

    init();

    function init() {
        $el.on('init', (event, slick, currentSlide) => carouselInit(event, slick));

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
    };



