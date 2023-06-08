import axios from 'axios';
export const HomeService = {
  getAllNotebook() {
    return axios.get('/homeasset/number/notebook').then((res) => res.data.data);
  },

  getStatusNotebook() {
    return axios.get(`/homeasset/status/notebook`).then((res) => res.data.data);
  },

  getAllTablet() {
    return axios.get(`/homeasset/number/tablet`).then((res) => res.data.data);
  },
  getStatusTablet() {
    return axios.get(`/homeasset/number/tablet`).then((res) => res.data.data);
  },
};
