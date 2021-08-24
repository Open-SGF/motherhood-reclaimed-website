import $ from 'jquery';

export default function () {
    const $navToggle = $('.js-nav-toggle');
    const $navLinks = $('.js-nav-links');
    const openText = $navToggle.data('open-text');
    const closeText = $navToggle.data('close-text');

    $navToggle.on('click', () => {
        const isOpen = $navToggle.attr('aria-expanded') === 'true';

        console.log(isOpen);

        if (isOpen) {
            $navToggle.removeClass('open');
            $navLinks.removeClass('open');
        } else {
            $navToggle.addClass('open');
            $navLinks.addClass('open');
        }

        $navToggle.attr('aria-label', isOpen ? openText : closeText);
        $navToggle.attr('aria-expanded', !isOpen);
    });
}
