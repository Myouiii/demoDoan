import axiosClient from './axiosClient';

const LOGIN_API_ENDPOINT = '/login';
const loginApi = {
  // api: đăng nhập
  postLogin: async(account) => {
    
    // const res = axios.post(url, account);
    // return res;
    const url = '/login';
    const res = await axiosClient.post(url, {account})
    return res;
  
  },

  // api: đăng nhập với google
  postLoginWithGoogle: (accessToken) => {
    const url = LOGIN_API_ENDPOINT + '/gg';
    const res = axiosClient.post(url, accessToken)
    return res;
  },

  // api: authentication
  getAuth: () => {
    const url = LOGIN_API_ENDPOINT + '/auth';
    if (process.env.NODE_ENV === 'production')
      return axiosClient.get(url, {
        params: {
          token: localStorage.getItem(process.env.ACCESS_TOKEN_SECRET),
        },
      });
    else return axiosClient.get(url);
  },

  // api: refresh token
  postRefreshToken: (refreshToken) => {
    const url = LOGIN_API_ENDPOINT + '/refresh_token';
    return axiosClient.post(url, refreshToken);
  },

  // api: logout
  postLogout: () => {
    const url = LOGIN_API_ENDPOINT + '/logout';
    if (process.env.NODE_ENV === 'production')
      return axiosClient.post(url, {
        token: localStorage.getItem(process.env.ACCESS_TOKEN_SECRET),
      });
    else return axiosClient.post(url);
  },
};

export default loginApi;
