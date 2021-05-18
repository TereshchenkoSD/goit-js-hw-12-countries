import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { error } from '@pnotify/core';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import './styles/styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

const refs = {
  searchInput: document.querySelector('.search-input'),
  cardContainer: document.querySelector('.card-container'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  onInputClear();
  const input = e.target;
  const searchQuery = input.value;

  if (!searchQuery) {
    return;
  } else {
    fetchCountries(searchQuery).then(renderCountry).catch(handleFetchError);
  }
}

const renderCountry = data => {
  const countriesQuantity = data.length;

  if (countriesQuantity === 1) {
    const countryMarkup = countryCardTpl(data);
    console.log(data);
    refs.cardContainer.insertAdjacentHTML('afterbegin', countryMarkup);
  }
  if (countriesQuantity >= 2 && countriesQuantity <= 10) {
    const countriesMarkup = countryListTpl(data);
    refs.cardContainer.insertAdjacentHTML('afterbegin', countriesMarkup);
  }

  if (countriesQuantity > 10) {
    error({
      text: 'Too many matches found. Please add more specific query!',
    });
  }
};

const handleFetchError = error => {
  error({
    text: 'Invalid request',
  });
};

function onInputClear() {
  refs.cardContainer.innerHTML = '';
}
