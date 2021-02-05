'use strict';

const baseUrl = `https://restcountries.eu/rest/v2/name/`;

export default {
  fetchCountries(searchQuery) {
    const request = `${searchQuery}`;
    return fetch(baseUrl + request).then(res => res.json());
  },
};