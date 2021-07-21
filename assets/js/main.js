import $ from 'jquery';
import BadgerAccordion from 'badger-accordion';
import 'slick-carousel';

/* Code for the BadgerAccordion */
const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);
});

/* Code for the Slick Carousel/Slider, based on https://jimfrenette.com/2019/04/slick-carousel-responsive-slides-to-show/ */
(function () {
    let $el = $('.variable');

    init();

    function init() {
        $el.on('init', (event, slick, currentSlide) => carouselInit(event, slick));

        $el.slick({
            accessibility: true,
            autoplaySpeed: 4000,
            autoplay: true,
            arrows: true,
            draggable: false,
            dots: false,
            infinite: true,
            mobileFirst: true,
            responsive: [{
                breakpoint: 980,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    draggable: true,
                }
            }]
        });

        let resizeTimeout;
        $(window).on('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setSlidesToShow(), 500);
        })
    };

    function carouselInit(event, slick) {
        // https://github.com/kenwheeler/slick/issues/1802
        setTimeout(() => setSlidesToShow(), 0);
    };

    function setSlidesToShow() {
        if ($(window).width() >= 980) {
            return;
        }

        $el.slick('slickSetOption', 'slidesToShow', 1);

        // refresh to apply slick-slide classes, dots etc. as needed
        $el.slick('resize');
    };
})();


