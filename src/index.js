import './styles.css';
import countryCardTpl from '../src/templates/country-card.hbs';
const axios = require('axios');

const refs = {
  searchInput: document.querySelector('.search-input'),
};

// fetch('https://restcountries.eu/rest/v2/name/russia')
//   .then(response => {
//     return response.json();
//   })
//   .then(country => {
//     const markup = countryCardTpl(country);
//     console.log(markup);
//   });

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';

axios
  .get('/name/switzerland')
  .then(response => {
    console.log(countryCardTpl(response.data));
  })
  .catch(error => console.log(error));
