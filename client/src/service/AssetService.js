export const AssetService = {
  getAllAsset() {
    return fetch('http://localhost:5000/asset', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
  getAssetByID(id) {
    console.log(id + ' id from client');
    return fetch(`http://localhost:5000/asset/${id}`, {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
};

export const AssetOptionService = {
  getStatusAsset() {
    return fetch('http://localhost:5000/asset/state/status', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
  getStockAsset() {
    return fetch('http://localhost:5000/asset/state/stock', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
  getUseableAsset() {
    return fetch('http://localhost:5000/asset/state/useable', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
  getTypeAsset() {
    return fetch('http://localhost:5000/asset/v1/types', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
  getTypeCom() {
    return fetch('http://localhost:5000/asset/type/com', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
};
