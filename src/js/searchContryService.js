import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import getRefs from './getRefs';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  onInputClear();
  const searchQuery = e.target.value;

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
    renderMarkup(countryMarkup);
  }
  if (countriesQuantity >= 2 && countriesQuantity <= 10) {
    const countriesMarkup = countryListTpl(data);
    renderMarkup(countriesMarkup);
  }

  if (countriesQuantity > 10) {
    console.log(data.length);
    error({
      text: 'Too many matches found. Please add more specific query!',
    });
  }
};

const renderMarkup = markup => {
  refs.cardContainer.insertAdjacentHTML('afterbegin', markup);
};

const handleFetchError = () => {
  error({
    text: 'Invalid request',
  });
};

function onInputClear() {
  refs.cardContainer.innerHTML = '';
}
