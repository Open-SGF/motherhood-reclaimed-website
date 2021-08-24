import BadgerAccordion from 'badger-accordion';

export default function() {
    /* Code for the BadgerAccordion */
    const accordions = document.querySelectorAll('.js-badger-accordion');

    Array.from(accordions).forEach((accordion) => {
        const ba = new BadgerAccordion(accordion);
    });
}

