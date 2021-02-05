import countryFetch from './fetchCountries.js';
import uniqCountry from '../templates/country.hbs';
import list from '../templates/list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
const { error } = require('@pnotify/core');
let _ = require('lodash.debounce');
const refs = {
  input: document.querySelector('.js-input'),
  list: document.querySelector('.js-list'),
  baseUrl: `https://restcountries.eu/rest/v2/name/`,
}


refs.input.addEventListener('input', debounce(searchCountry, 500));


function searchCountry(event) {
  event.preventDefault();
  clear();
  const inputText = event.target.value;

  countryFetch.fetchCountries(inputText)
    .then(data => {
      if (data.length > 10) {
        error({ text: 'Слишком много совпадений'});
      }
      else if (data.status === 404) {
        error({ text: 'Страна не найдена. Напишите более содержительное название'});
      }
      else if (data.length === 1) {
        markUp(data, uniqCountry);
      } else if (data.length <= 10) { 
        markUp(data, list);
      }
    });
}

function markUp(countries, template) {
  const markUp = countries.map(temp => template(temp)).join();
  refs.list.insertAdjacentHTML('afterbegin', markUp);
}

function clear() {
  refs.list.innerHTML = '';
}