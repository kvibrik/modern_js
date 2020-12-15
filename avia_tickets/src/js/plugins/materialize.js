import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const sidenav = document.querySelector('.sidenav');
const selects = document.querySelectorAll('select');
const autocomplete = document.querySelectorAll('.autocomplete');
const datepicker = document.querySelectorAll('.datepicker');

M.Sidenav.init(sidenav);
M.FormSelect.init(selects);
M.Autocomplete.init(autocomplete, {
  data: {
    Apple: null,
    Microsoft: null,
    Google: 'https://placehold.it/250x250',
  },
});
M.Datepicker.init(datepicker, {
  showClearBtn: true,
  format: 'yyyy-mm',
});

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

export function getDatepickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
