export const AssetService = {
  getAllAsset() {
    return fetch('http://localhost:5000/asset', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
};
