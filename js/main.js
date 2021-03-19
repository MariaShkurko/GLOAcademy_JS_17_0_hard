'use strict';

const input = document.querySelector('input'),
    paragraph = document.querySelector('p');

function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

const translate = debounce(() => {
    paragraph.textContent = input.value;
}, 500);

input.addEventListener('input', () => setTimeout(translate, 300));