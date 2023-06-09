import axios from 'axios';
export const HomeService = {
  getAllNotebook() {
    return axios.get('/homeasset/number/notebook').then((res) => res.data.data);
  },

  getStatusANotebook() {
    return axios
      .get(`/homeasset/status/a/notebook`)
      .then((res) => res.data.data);
  },
  getStatusBNotebook() {
    return axios
      .get(`/homeasset/status/b/notebook`)
      .then((res) => res.data.data);
  },
  getStatusCNotebook() {
    return axios
      .get(`/homeasset/status/c/notebook`)
      .then((res) => res.data.data);
  },
  getAllTablet() {
    return axios.get(`/homeasset/number/tablet`).then((res) => res.data.data);
  },
  getStatusATablet() {
    return axios.get(`/homeasset/status/a/tablet`).then((res) => res.data.data);
  },
  getStatusBTablet() {
    return axios.get(`/homeasset/status/b/tablet`).then((res) => res.data.data);
  },
  getStatusCTablet() {
    return axios.get(`/homeasset/status/c/tablet`).then((res) => res.data.data);
  },
};
