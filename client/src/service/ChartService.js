import axios from 'axios';
export const ChartService = {
  getNumberAsset() {
    return axios.get('/chart/number/asset').then((res) => res.data.data);
  },
  getNumberAllAsset() {
    return axios.get('/chart/number/allasset').then((res) => res.data.data);
  },
  getNumberUseAble() {
    return axios
      .get('/chart/number/asset/useable')
      .then((res) => res.data.data);
  },
  getAssetYear() {
    return axios.get('/chart/year/asset').then((res) => res.data.data);
  },
  getCateAssetYear(id) {
    return axios.get(`/chart/year/cate/${id}`).then((res) => res.data.data);
  },
  getSubAssetYear(id) {
    return axios.get(`/chart/year/sub/${id}`).then((res) => res.data.data);
  },
  getNumberStatus() {
    return axios.get('/chart/number/status').then((res) => res.data.data);
  },
  getStatusYear(id) {
    return axios.get(`/chart/status/year/${id}`).then((res) => res.data.data);
  },
};
