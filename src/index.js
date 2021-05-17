import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import axios from 'axios';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import './styles/styles.css';

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

function renderCountry(data) {
  const countriesQuantity = data.length;

  if (countriesQuantity === 1) {
    const countryMarkup = countryCardTpl(data);
    console.log(data);
    refs.cardContainer.insertAdjacentHTML('afterbegin', countryMarkup);
  }
  // if (countriesQuantity >= 2 && countriesQuantity <= 10) {
  //   const countriesMarkup = countryListTpl(data);
  //   refs.cardContainer.insertAdjacentElement('afterbegin', countriesMarkup);
  // }

  if (countriesQuantity > 10) {
    console.log(`Длина массива ${countriesQuantity}`);
    alert('Too many matches found. Please enter a more specific query!');
  }
}

const handleFetchError = error => {
  console.log(error);
};

function onInputClear() {
  refs.cardContainer.innerHTML = '';
}
