import $ from 'jquery';
import BadgerAccordion from 'badger-accordion';
import 'slick-carousel';

/* Code for the BadgerAccordion */
const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);
});

/* Code for the Slick Carousel/Slider, credit to the Slick Carousel Project */
(function () {

    var slidesToShow = 1,
        slideWidth = 1030,
        slideSpacing = 30;

    var $el = $('.variable');

    init();

    function init() {
        $el.on('init', (event, slick, currentSlide) => carouselInit(event, slick));

        $el.slick({
            accessibility: true,
            arrows: true,
            dots: true,
            infinite: true,
            mobileFirst: true,
            responsive: [{
                breakpoint: 980,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            }]
        });

        $el.css('padding-left', slideSpacing / 2 + 'px');

        var resizeTimeout;
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

        var num1, num2,
            slickListWidth = $el.find('.slick-list').width(),
            num1 = slickListWidth / slideWidth;
        num2 = Math.floor(num1) * slideSpacing;
        num1 = (slickListWidth - num2) / slideWidth;
        num1 = Math.floor(num1 * 100) / 100;

        console.log('slickListWidth', slickListWidth);
        console.log('slideWidth', slideWidth);
        console.log('slidesToShow', num1);

        $el.slick('slickSetOption', 'slidesToShow', num1);

        // refresh to apply slick-slide classes, dots etc. as needed
        $el.slick('resize');

        slidesToShow = num1;
    };
})();

$(document).on('ready', function() {
    $(".vertical-center-3").slick({
        dots: true,
        vertical: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
    });

    $(".lazy").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true
    });
});


