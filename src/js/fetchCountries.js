function fetchCountries(searchQuery) {
  const COUNTRY_URL = 'https://restcountries.eu/rest/v2/name';
  return fetch(`${COUNTRY_URL}/${searchQuery}`)
    .then(res => {
      return res.json();
    })
    .catch(error => {
      throw new Error(error);
    });
}

export { fetchCountries };
