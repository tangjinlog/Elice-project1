// import * as Api from '/api.js';
// import { validateEmail } from '/useful-functions.js';

const $ = (selector) => document.querySelector(selector);
const submitButton = $('#submitBtn');
const testButton = document.querySelector('.testBtn');

submitButton.addEventListener('click', () => {
	alert('hi');
});
testButton.addEventListener('click', () => {
	alert('hi');
});
