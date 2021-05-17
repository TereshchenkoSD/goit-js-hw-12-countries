import './styles/styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import fetchCountries from './js/fetchCountries';
import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

const refs = {
  searchInput: document.querySelector('.search-input'),
  cardContainer: document.querySelector('.card-container'),
};

// refs.searchInput.addEventListener('input', onSearch);

// function onSearch() {
//   console.log();
// }

// const renderCountryCard = data => {
//   const markup = countryCardTpl(data);
//   refs.cardContainer.insertAdjacentHTML('afterbegin', markup);
// };

// const handleFetchError = error => {
//   console.log(error);
// };

// fetchCountries('canada').then(renderCountryCard).catch(handleFetchError);

const renderMarkup = data => {
  const countryArray = data.length;
  const countryCardMarkup = countryCardTpl(data);
  const countryListMarkup = countryListTpl(data);
};
