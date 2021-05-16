import './styles.css';
const axios = require('axios');

const refs = {
  searchInput: document.querySelector('.search-input'),
};

// fetch('https://restcountries.eu/rest/v2/name/russia')
//   .then(response => {
//     return response.json();
//   })
//   .then(country => {
//     console.log(country);
//   });

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';

axios
  .get('/name/switzerland')
  .then(response => console.group(response))
  .catch(error => console.log(error));
