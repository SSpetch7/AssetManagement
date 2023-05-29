import axios from 'axios';
export const ReportService = {
  getAllYear() {
    return axios.get('/dropdown/year').then((res) => res.data.data);
  },
  getAssetByYear(year) {
    return axios.get(`/dropdown/year/${year}`).then((res) => res.data.data);
  },
};
