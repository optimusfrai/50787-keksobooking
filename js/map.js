'use strict';

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerTypes = [
  'flat',
  'house',
  'bungalo'
];

var offerTimeSlots = [
  '12:00',
  '13:00',
  '14:00'
];

var offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var pinWidth = 56;
var pinHeight = 75;
var mapContainer = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('#offer-dialog');
var template = document.querySelector('#lodge-template');

/**
 * Returns a random number between min and max
 * @param {number} min Lower bound
 * @param {number} [max] Upper bound
 * @return {number}
 */
function getRandomValue(min, max) {
  if (max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (min + 1));
  }
}

/**
 * Returns string with leading zero
 * @param {number} number
 * @return {string}
 */
function pad(number) {
  return number < 10
    ? '0' + number
    : number.toString();
}

/**
 * Returns random element of array
 * @param {Array} array
 * @return {*}
 */
function getRandomElement(array) {
  return array[getRandomValue(0, array.length - 1)];
}

/**
 * Returns an array which contains random elements of the source array
 * @param {Array} array
 * @return {Array}
 */
function getRandomElements(array) {
  var arrayCopy = array.slice();
  arrayCopy.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  return arrayCopy.slice(0, getRandomValue(0, arrayCopy.length - 1));
}

/**
 * Generates adverts
 * @param {number} [limit] Number of adverts to generate
 * @return {Array} Generated adverts
 */
function generateOffers(limit) {
  limit = limit || 8;
  var pins = [];
  for (var i = 0; i < limit; i++) {
    var normalizedIndex = i % 8;
    var locationX = getRandomValue(300, 900);
    var locationY = getRandomValue(100, 500);
    pins.push({
      'author': {
        'avatar': 'img/avatars/user' + pad(normalizedIndex + 1) + '.png'
      },
      'offer': {
        'title': offerTitles[normalizedIndex],
        'address': locationX + ', ' + locationY,
        'price': getRandomValue(1000, 1000000),
        'type': getRandomElement(offerTypes),
        'rooms': getRandomValue(1, 5),
        'guests': getRandomValue(1),
        'checkin': getRandomElement(offerTimeSlots),
        'checkout': getRandomElement(offerTimeSlots),
        'features': getRandomElements(offerFeatures),
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return pins;
}

/**
 * Draws pins on map
 * @param {Array} offers
 */
function drawPins(offers) {
  var fragment = document.createDocumentFragment();
  offers.forEach(function (offer) {
    var pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.left = (offer.location.x - pinWidth / 2) + 'px';
    pin.style.top = (offer.location.y - pinHeight) + 'px';
    var img = document.createElement('img');
    img.src = offer.author.avatar;
    img.className = 'rounded';
    img.width = 40;
    img.height = 40;
    pin.appendChild(img);
    fragment.appendChild(pin);
  });
  mapContainer.appendChild(fragment);
}

/**
 * Draws information panel
 * @param {Object} advert
 */
function drawPanel(advert) {
  var panel = template.content.cloneNode(true);
  var featuresContainer = panel.querySelector('.lodge__features');
  panel.querySelector('.lodge__title').textContent = advert.offer.title;
  panel.querySelector('.lodge__address').textContent = advert.offer.address;
  panel.querySelector('.lodge__price').innerHTML = advert.offer.price + '&#x20bd;/ночь';
  panel.querySelector('.lodge__type').textContent = advert.offer.type;
  panel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  panel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout + '';
  advert.offer.features.forEach(function (feature) {
    var featureEl = document.createElement('span');
    featureEl.className = 'feature__image feature__image--' + feature;
    featuresContainer.appendChild(featureEl);
  });
  panel.querySelector('.lodge__description').textContent = advert.offer.description;
  dialog.querySelector('.dialog__title img').src = advert.author.avatar;
  dialog.replaceChild(panel, dialog.querySelector('.dialog__panel'));
}

var adverts = generateOffers();
drawPins(adverts);
drawPanel(adverts[0]);
