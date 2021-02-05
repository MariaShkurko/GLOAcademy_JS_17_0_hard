'use strict';

let week = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

let currentDayOfWeek = (new Date()).getDay() - 1;
currentDayOfWeek = currentDayOfWeek === (-1) ? 6 : currentDayOfWeek;

console.log(week[currentDayOfWeek]);

for (const day of week) {
    let style = 'margin: 5px 0; ';

    if (day === week[currentDayOfWeek]) {
        style += 'font-weight: bold; ';
    }

    if (day === week[5] || day === week[6]) {
        style += 'font-style: italic; ';
    }

    document.write('<p style="' + style + '">' + day + '</p>');
}