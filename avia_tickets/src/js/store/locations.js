import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
  }

  // сразу получаем все города и страны от сервера
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
    ]);

    const [countries, cities] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return response;
  }

  getCityCodeByKey(key) {
    return this.cities[key].code;
  }

  // формирование данных для автокомплита:
  // { 'City name, Country name': null }
  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [key]) => {
      acc[key] = null;
      return acc;
    }, {});
  }

  // изменение данных по странам к формату:
  // { 'Country code': {...} }
  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;

      return acc;
    }, {});
  }

  // изменение данных по городам к формату:
  // { 'City name, Country name': {...} }
  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const countryName = this.getCountryNameByCode(city.country_code);
      const cityName = city.name || city.name_translations.en;
      const key = `${cityName}, ${countryName}`;

      acc[key] = city;
      return acc;
    }, {});
  }

  // получаем страну по её коду из города
  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    console.log(response);
  }
}

const locations = new Locations(api);

export default locations;
