import $ from 'jquery';

export function navToggle () {
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

import { throttle } from 'throttle-debounce';

const SCROLL_DIRECTION_UP = 1;
const SCROLL_DIRECTION_DOWN = 0;

export function throttleNav () {
    const $navigation = document.querySelector('.js-navigation');
    const $navOpen = document.querySelector('.js-nav-open');
    const $navClose = document.querySelector('.js-nav-close');
    const isScrolledClass = 'is-scrolled';
    const isHiddenClass = 'is-hidden';
    const isOpenClass = 'is-open';
    const isMobileClass = 'is-mobile';
    const mobileMq = window.matchMedia('(max-width: 768px)'); // True or false querry of ifWeAreOnMobile?
    let navigationHeight = $navigation.offsetHeight;
    let currentScrollPosition = 0;
    let lastScrollPosition = 0;
    let isScrolled = false;
    let isScrolledPastNavHeight = false;
    let scrollDirection = SCROLL_DIRECTION_DOWN;

    const onScroll = throttle(75, () => {
        currentScrollPosition = window.scrollY || window.pageYOffset;

        const previousIsScrolled = isScrolled;
        const previousIsScrolledPastNavHeight = isScrolledPastNavHeight;
        const previousScrollDirection = scrollDirection;

        isScrolled = currentScrollPosition >= 10;
        isScrolledPastNavHeight = currentScrollPosition >= navigationHeight;
        scrollDirection = currentScrollPosition < lastScrollPosition
            ? SCROLL_DIRECTION_UP
            : SCROLL_DIRECTION_DOWN;

        if (previousIsScrolled !== isScrolled) {
            handleIsScrolledChanged();
        }

        if (previousIsScrolledPastNavHeight !== isScrolledPastNavHeight) {
            handleScrolledPastNavHeightChanged();
        }

        if (previousScrollDirection !== scrollDirection) {
            handleScrollDirectionChange()
        }

        lastScrollPosition = currentScrollPosition;
    });

    const handleIsScrolledChanged = () => {
        if (isScrolled) {
            $navigation.classList.add(isScrolledClass);
        } else {
            $navigation.classList.remove(isScrolledClass);
        }
    };

    const handleScrolledPastNavHeightChanged = () => {
        if (mobileMq.matches) {
            return;
        }

        if (isScrolledPastNavHeight) {
            $navigation.classList.add(isHiddenClass);
        }
    };

    const handleScrollDirectionChange = () => {
        if (mobileMq.matches) {
            return;
        }

        if (scrollDirection === SCROLL_DIRECTION_UP) {
            $navigation.classList.remove(isHiddenClass);
        }

        if (isScrolledPastNavHeight && scrollDirection === SCROLL_DIRECTION_DOWN) {
            $navigation.classList.add(isHiddenClass);
        }
    };

    const onMobileChange = () => {
        navigationHeight = $navigation.offsetHeight;

        if (mobileMq.matches) {
            $navigation.classList.add(isMobileClass);
            $navigation.classList.remove(isHiddenClass);
        } else {
            $navigation.classList.remove(isMobileClass);
        }
    };

    mobileMq.addEventListener('change', onMobileChange);
    onMobileChange();

    $navOpen.addEventListener('click', () => {
        $navigation.classList.add(isOpenClass);
    });

    $navClose.addEventListener('click', () => {
        $navigation.classList.remove(isOpenClass);
    });

    window.addEventListener('scroll', onScroll);
    onScroll();
}
