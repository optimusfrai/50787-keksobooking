'use strict';

var MIN_PRICES = {
  'flat': 1000,
  'bungalo': 0,
  'house': 10000
};

var GUESTS = {
  1: 0,
  2: 3,
  100: 3
};

var form = document.querySelector('.notice__form');
var timeSelect = document.querySelector('#time');
var timeOutSelect = document.querySelector('#timeout');
var typeSelect = document.querySelector('#type');
var roomsCountSelect = document.querySelector('#room_number');
var guestsCountSelect = document.querySelector('#capacity');
var priceInput = document.querySelector('#price');

timeSelect.addEventListener('change', function (event) {
  timeOutSelect.value = event.target.value;
});

timeOutSelect.addEventListener('change', function (event) {
  timeSelect.value = event.target.value;
});

typeSelect.addEventListener('change', function (event) {
  if (event.target.value in MIN_PRICES) {
    priceInput.setAttribute('min', MIN_PRICES[event.target.value]);
  }
});

roomsCountSelect.addEventListener('change', function (event) {
  if (event.target.value in GUESTS) {
    guestsCountSelect.value = GUESTS[event.target.value];
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  form.reset();
});
