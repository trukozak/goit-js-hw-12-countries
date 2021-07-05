import '../sass/main.scss';
import countryCardTpl from '../tpl/country-cards.hbs';
import countryListTpl from '../tpl/country-list.hbs';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector('.input');
const countryRef = document.querySelector('.country-res');

const renderRes = country => {
  countryRef.innerHTML = '';
  if (country.length > 10) {
    error({
      text: 'Too many matches found. Please, enter a more specific query!',
      delay: 3000,
    });
  } else if (country.length > 1) {
    countryRef.innerHTML = countryListTpl(country);
  } else if (country.length === 1) {
    countryRef.innerHTML = countryCardTpl(country[0]);
  } else {
    error({
      text: 'Invalid name country!',
      delay: 3000,
    });
  }
};

const countryLoaded = res => {
  countryRef.innerHTML = '';
  if (res === '') return;
  fetchCountries(res)
    .then(renderRes)
    .catch(error => error);
};

inputRef.addEventListener(
  'input',
  debounce(e => {
    const input = e.target.value;
    localStorage.setItem('country', input);
    countryLoaded(input);
  }, 500),
);

const onSearchCountry = () => {
  const strSearch = localStorage.getItem('country');
  if (!strSearch) return;
  countryLoaded(strSearch);
  inputRef.value = strSearch;
};

onSearchCountry();
