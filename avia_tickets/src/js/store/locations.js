import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCities = {};
    this.airlines = {};
    this.lastSearch = {};
  }

  // сразу получаем все города и страны от сервера
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCities = this.createShortCities(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    console.log(this.cities);

    return response;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      item => item.full_name === key,
    );

    return city.code;
  }

  getAirlineByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  // формирование данных для автокомплита:
  // { 'City name, Country name': null }
  createShortCities(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
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

  // изменение данных по компаниям
  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `https://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;

      acc[item.code] = item;
      return acc;
    }, {});
  }

  // изменение данных по городам к формату:
  // { 'City name, Country name': {...} }
  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const full_name = `${city.name}, ${country_name}`;

      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = response.data;
    // серилизовать поиск так что бы внури были название города и страны
  }
}

const locations = new Locations(api);

export default locations;
