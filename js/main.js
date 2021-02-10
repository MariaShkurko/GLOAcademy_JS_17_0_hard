'use strict';

const formatHours = (hours) => {
    if (hours == 1 || hours == 21) {
        return 'час';
    } else if ((hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24)) {
        return 'часа';
    } else {
        return 'часов';
    }
};

const formatMinutes = (minutes) => {
    if (minutes == 1 || minutes == 21 || minutes == 31 || minutes == 41 || minutes == 51) {
        return 'минута';
    } else if ((minutes >= 2 && minutes <= 4) ||
        (minutes >= 22 && minutes <= 24) ||
        (minutes >= 32 && minutes <= 34) ||
        (minutes >= 42 && minutes <= 44) ||
        (minutes >= 52 && minutes <= 54)) {
        return 'минуты';
    } else {
        return 'минут';
    }
};

const formatSeconds = (seconds) => {
    if (seconds == 1 || seconds == 21 || seconds == 31 || seconds == 41 || seconds == 51) {
        return 'секунда';
    } else if ((seconds >= 2 && seconds <= 4) ||
        (seconds >= 22 && seconds <= 24) ||
        (seconds >= 32 && seconds <= 34) ||
        (seconds >= 42 && seconds <= 44) ||
        (seconds >= 52 && seconds <= 54)) {
        return 'секунды';
    } else {
        return 'секунд';
    }
};

const formatNumbers = (number) => {
    if (String(number).length < 2) {
        return '0' + String(number);
    }

    return String(number);
};

const date = document.querySelector('.date');
const shortDate = document.querySelector('.short-date');

setInterval(() => {
    let currentDate = new Date(),
        year = currentDate.getFullYear(),
        month = currentDate.getMonth(),
        day = currentDate.getDate(),
        dayOfWeek = currentDate.getDay(),
        hours = currentDate.getHours(),
        minutes = currentDate.getMinutes(),
        seconds = currentDate.getSeconds();

    let week = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    let months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];

    date.innerHTML = '<p>Сегодня ' +
        week[dayOfWeek] + ', ' +
        day + ' ' +
        months[month] + ' ' +
        year + ' года, ' +
        hours + ' ' + formatHours(hours) + ' ' +
        minutes + ' ' + formatMinutes(minutes) + ' ' +
        seconds + ' ' + formatSeconds(seconds) + '</p>';

    shortDate.innerHTML = '<p>' +
        formatNumbers(day) + '.' +
        formatNumbers(month) + '.' +
        formatNumbers(year) + ' - ' +
        formatNumbers(hours) + ':' +
        formatNumbers(minutes) + ':' +
        formatNumbers(seconds) + '</p>';
}, 1000);