function setParams(config) {
  console.log(config);
  const params = config.params || {};
  const newConfig = Object.assign(config);
  newConfig.params = Object.assign(params, {
    plot: 'full',
    apikey: process.env.VUE_APP_API_KEY,
  });

  return newConfig;
}

export default function (axios) {
  axios.interceptors.request.use(setParams);
}
