import axios from 'axios';
import queryString from 'query-string';
//get env mode

const env = process.env.NODE_ENV;
const baseURL =
  !env || env === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL;
//Set up default config for http request
// Tao ra 1 object dung chung cho moi noi can import no
const axiosClient = axios.create({
  baseURL: baseURL + '/apis',
  /* You are setting the Content-Type as application/x-www-form-urlencoded, which is not necessary. This is the default Content-Type. In the case that your data is JSON, as it is in your case, axios will automatically set the Content-Type to application/json;charset=utf-8, but only if the Content-Type hasn't been set manually. Try removing your headers and see if this resolves your issue. 
  // headers: {
  //   'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*"
  // },*/
  // headers: {
  //   "Access-Control-Allow-Origin": "*"
  // },
  withCredentials: true,
  //query string dung de parse url thanh json thay cho axios (tranh tuong hop null url)
  paramsSerializer: (params) => queryString.stringify(params),
});

//handle request
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  },
);

//handle response
axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
