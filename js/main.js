'use strict'

let lang = document.documentElement.lang,
    daysOfWeekRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    daysOfWeekEn = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

if (lang === 'ru') {
    console.log(daysOfWeekRu);
} else {
    console.log(daysOfWeekEn);
}

switch (lang) {
    case 'ru':
        console.log(daysOfWeekRu);
        break;
    case 'en':
        console.log(daysOfWeekEn);
        break;
    default:
        console.log('Is not lang');
}

let daysOfWeek = [daysOfWeekRu, daysOfWeekEn];

console.log(lang === 'ru' ? daysOfWeek[0] : daysOfWeek[1]);