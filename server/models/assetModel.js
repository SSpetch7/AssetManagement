import db from '../db.js';

var Asset = (asset) => {
  //   this.username = asset.username;
  //   this.first_name = asset.first_name;
  //   this.last_name = asset.last_name;
  //   this.gender = asset.gender;
};

const selectColAsset =
  'asset_order,asset_id ,asset_name,asset_year,asset_status,asset_useable,room_id';
const useableTable =
  'JOIN useable_state AS useable ON asset.asset_useable = useable.useable_id';
const sqlAllAsset = `SELECT ${selectColAsset}, status_name AS asset_status, useable_name as asset_useable FROM assetTable AS asset JOIN status_state AS status ON asset.asset_status = status.status_id ${useableTable}`;
const sqlOrderASC = `${sqlAllAsset} ORDER BY asset_order ASC`;

Asset.getAllAsset = (result) => {
  db.query(sqlOrderASC, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

export default Asset;
