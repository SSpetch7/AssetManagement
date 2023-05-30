import axios from 'axios';
export const ChartService = {
  getAssetYear() {
    return axios.get('/chart/year/asset').then((res) => res.data.data);
  },
  getCateAssetYear(id) {
    return axios.get(`/chart/year/cate/${id}`).then((res) => res.data.data);
  },
  getSubAssetYear(id) {
    return axios.get(`/chart/year/sub/${id}`).then((res) => res.data.data);
  },
};
