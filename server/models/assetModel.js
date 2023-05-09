import db from '../db.js';

var Asset = (asset) => {
  //   this.username = asset.username;
  //   this.first_name = asset.first_name;
  //   this.last_name = asset.last_name;
  //   this.gender = asset.gender;
};

const selectColAsset =
  'asset_order,asset_id ,asset_name,asset_year,room_id,sck_name,s_name,u_name ,cate_id as c_id';

const sckSate = `JOIN stock_state AS sck ON a.asset_stock = sck.stock_id`;
const sState = `JOIN status_state AS s  ON a.asset_status = s.status_id`;
const uState = `JOIN useable_state AS u  ON a.asset_status = u.useable_id`;
const assetJoinState = `SELECT * ,sck.stock_name AS sck_name, s.status_name AS s_name, u.useable_name AS u_name  FROM asset_detail as a ${sckSate} ${sState} ${uState} `;

const selectColAC = `a.asset_order,a.asset_id,a.asset_name,a.asset_year,a.gallery_id,a.detail,a.room_id`;

const sqlAssetByID = `SELECT ${selectColAC}, c.cate_name AS category, s.sub_name AS subcategory,state.sck_name,state.s_name,state.u_name
FROM asset_detail a
LEFT JOIN category c ON a.cate_id = c.cate_id
LEFT JOIN subcate s ON a.sub_id = s.sub_id 
JOIN (${assetJoinState}) as state ON a.asset_id = state.asset_id WHERE a.asset_id = ?`;

const sqlAssetASC = `SELECT ${selectColAsset} FROM (${assetJoinState}) as ajs  ORDER BY asset_order ASC`; // yes

Asset.getAllAsset = (result) => {
  db.query(sqlAssetASC, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('asset_detail fetching successfully');
      result(null, res);
    }
  });
};

Asset.getAssetByID = (id, callback) => {
  db.query(sqlAssetByID, [id], (err, results) => {
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

const typeAsset = `SELECT cate_name as name FROM category `;
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

const typeComAsset = 'SELECT sub_name as name FROM subcate ';
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