import axios from 'axios';
export const AssetService = {
  getAllAsset() {
    return axios.get('/asset').then((res) => res.data.data);
  },
  getAssetByID(id) {
    return axios.get(`/asset/${id}`).then((res) => res.data.data);
  },
};

export const AssetOptionService = {
  getStatusAsset() {
    return axios.get('/asset/state/status').then((res) => res.data.data);
  },
  getStockAsset() {
    return axios.get('/asset/state/stock').then((res) => res.data.data);
  },
  getUseableAsset() {
    return axios.get('/asset/state/useable').then((res) => res.data.data);
  },
  getTypeAsset() {
    return axios.get('/asset/v1/types').then((res) => res.data.data);
  },
  getTypeCom() {
    return axios.get('/asset/type/com').then((res) => res.data.data);
  },
};

export const NumService = {
  getLstOrderAsset() {
    return axios.get('/asset/lst/order').then((res) => res.data.data);
  },
};
