"use strict";

function DomElement(selector, height, width, bg, fontSize, options = '') {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.options = options;
}

DomElement.prototype.createElement = function () {
    if (this.selector[0] === '.') {
        const className = this.selector.substring(1);
        const newElement = document.createElement('div');

        newElement.className = className;
        newElement.setAttribute('style', `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}; ${this.options}`);
        newElement.innerHTML = `Новый div с классом ${className}`;

        document.body.append(newElement);
    } else if (this.selector[0] === '#') {
        const id = this.selector.substring(1);
        const newElement = document.createElement('p');

        newElement.id = id;
        newElement.style.cssText = `height: ${this.height};
            width: ${this.width};
            background: ${this.bg};
            font-size: ${this.fontSize};`;
        newElement.innerHTML = `Новый параграф с id ${id}`;

        document.body.append(newElement);
    }
}

const div1 = new DomElement('.square', '100px', '100px', '#c2c2f3', '13px', 'position: absolute;');

document.addEventListener('DOMContentLoaded', () => div1.createElement());
document.addEventListener("keydown", (e) => {
    const div = document.querySelector('div'),
        top = parseInt(getComputedStyle(div).top),
        left = parseInt(getComputedStyle(div).left);

    switch (e.key) {
        case "ArrowUp":
            div.style.top = `${top - 10}px`;
            break;
        case "ArrowDown":
            div.style.top = `${top + 10}px`;
            break;
        case "ArrowRight":
            div.style.left = `${left + 10}px`;
            break;
        case "ArrowLeft":
            div.style.left = `${left - 10}px`;
            break;
    }
});