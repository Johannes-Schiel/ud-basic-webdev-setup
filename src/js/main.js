
const BUTTON = document.querySelector('#button-Up');
const COUNT = document.querySelector('.output');

let counter = 0;

COUNT.innerHTML = counter;

BUTTON.addEventListener('click', () => {
    counter += 1;
    COUNT.innerHTML = counter;
});