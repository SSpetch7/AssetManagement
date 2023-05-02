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
  'JOIN useable_state AS useable ON asset_detail.asset_useable = useable.useable_id';
const sqlAllAsset = `SELECT ${selectColAsset}, status_name AS asset_status, useable_name as asset_useable FROM asset_detail  JOIN status_state AS status ON asset_detail.asset_status = status.status_id ${useableTable}`;
const sqlOrderASC = `${sqlAllAsset} ORDER BY asset_order ASC`;

Asset.getAllAsset = (result) => {
  db.query(sqlOrderASC, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('asset_detail fetching successfully');
      result(null, res);
    }
  });
};

const sqlByID = 'SELECT * FROM asset_detail WHERE asset_id = ?';
Asset.getAssetByID = (id, callback) => {
  db.query(sqlByID, [id], (err, results) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      return callback(err, null);
    } else {
      console.log('Asset fetching successfully');
      return callback(null, results[0]);
    }
  });
};

const statusState = 'SELECT status_name as name FROM status_state';
Asset.getStatusState = (result) => {
  db.query(statusState, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const stockState = 'SELECT stock_name as name FROM stock_state';
Asset.getStockState = (result) => {
  db.query(stockState, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const useableState = 'SELECT useable_name as name FROM useable_state';
Asset.getUseableState = (result) => {
  db.query(useableState, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const typeAsset =
  'SELECT cate_name as name FROM category WHERE parent_id IS NULL';
Asset.getTypeAsset = (result) => {
  db.query(typeAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const typeComAsset =
  'SELECT cate_name as name FROM category WHERE cate_id = 3 OR parent_id = 3';
Asset.getTypeCom = (result) => {
  db.query(typeComAsset, (err, res) => {
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
