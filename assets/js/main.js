
import $ from 'jquery';

console.log($);

// Added by Ethan Zitting for the badger accordion html module
// Importing accordion
import BadgerAccordion from 'badger-accordion';

const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);

    // console.log(ba.getState([0]));
});
