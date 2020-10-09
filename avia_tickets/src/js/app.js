import '../css/style.css';
import './plugins';
import locations from './store/locations';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelector('.sidenav');
  const instances = M.Sidenav.init(elems);
});

locations.init().then(res => {
  console.log(res);
  console.log(locations);
  console.log(locations.getCitiesByCountryCode('PE'));
});
