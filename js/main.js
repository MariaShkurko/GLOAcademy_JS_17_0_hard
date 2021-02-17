'use strict';

const randomColor = () => {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

const btn = document.querySelector('button'),
    title = document.querySelector('h1');

btn.addEventListener('click', () => {
    const color = randomColor();
    console.log(color);

    document.body.style.backgroundColor = color;
    btn.style.color = color;
    title.textContent = color;
})
