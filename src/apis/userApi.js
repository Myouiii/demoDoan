import axiosClient from './axiosClient';

const USER_API_URL = '/user';

const userApi = {
  //get admin user
  getUser: () => {
    const url = USER_API_URL;
    if (process.env.NODE_ENV === 'production')
      return axiosClient.get(url, {
        params: {
          token: localStorage.getItem(process.env.ACCESS_TOKEN_SECRET),
        },
      });
    else return axiosClient.get(url);
  },
  putUpdateUser: (userId = '', value = {}) => {
    const url = USER_API_URL + '/update';
    return axiosClient.put(url, { userId, value });
  },
};

export default userApi;
