function setParams(config) {
  const params = config.params || {};
  const newConfig = Object.assign(config);
  newConfig.params = Object.assign(params, {
    plot: 'full',
    apikey: process.env.VUE_APP_API_KEY,
  });

  return newConfig;
}

function returnData(res) {
  return res.data;
}

export default function(axios) {
  // request interceptors
  axios.interceptors.request.use(setParams);

  // response unterceptors
  axios.interceptors.response.use(returnData);
}
