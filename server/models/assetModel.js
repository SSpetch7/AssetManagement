import db from '../db.js';

var Asset = (asset) => {
  //   this.username = asset.username;
  //   this.first_name = asset.first_name;
  //   this.last_name = asset.last_name;
  //   this.gender = asset.gender;
};

const selectColAsset =
  'asset_order,asset_id ,asset_name,asset_year,asset_useable,asset_status,room_id';
const useableTable =
  'JOIN useable_state AS useable ON asset_detail.asset_useable = useable.useable_id';
const stockTable =
  'JOIN stock_state AS stock ON asset_detail.asset_stock = stock.stock_id';
const sqlAllAsset = `SELECT ${selectColAsset}, status_name AS asset_status, stock_name, useable_name as asset_useable FROM asset_detail  JOIN status_state AS status ON asset_detail.asset_status = status.status_id ${useableTable} ${stockTable}`;
const sqlOrderASC = `${sqlAllAsset} ORDER BY asset_order ASC`;
const test = 'SELECT * from asset_detail ';
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

const selectColAssetFull = `asset_order,asset_id,asset_name,asset_year,gallery_id,detail,room_id,cate_id`;
const sqlAllAssetFull = `SELECT * FROM asset_detail  JOIN status_state AS status ON asset_detail.asset_status = status.status_id ${useableTable} ${stockTable}`;
const sqlByCateId = `SELECT asset_detail.cate_id AS asset_cate_ID ,category.parent_id AS cate_parent_ID FROM asset_detail JOIN category ON asset_detail.cate_id  = category.cate_id`;
const sqlBySubCateId = `SELECT asset_detail.cate_id AS asset_cate_ID FROM asset_detail JOIN category ON asset_detail.cate_id  = category.cate_id`;
const sqlCateName = `SELECT asset_cate_ID,cate_parent_ID,category.cate_name as cate_p_name FROM category JOIN (${sqlByCateId}) as asset_cate_id ON category.cate_id = asset_cate_id.cate_parent_ID`;
const sqlSubCateName = `SELECT cate_id as sub_cate_id , cate_name as sub_cate_name FROM category WHERE cate_id = (${sqlBySubCateId})`;
const sqlById = `SELECT * FROM (${sqlAllAssetFull}) as sql_full JOIN (${sqlCateName}) as sql_p_cate ON sql_full.cate_id = sql_p_cate.asset_cate_ID JOIN (${sqlSubCateName}) as sql_sub_cate ON sql_p_cate.asset_cate_ID = sql_sub_cate.sub_cate_id `;

const test1 = `select * from asset_detail join useable_state as sql_useable on asset_useable = sql_useable.useable_id`;

Asset.getAssetByID = (id, callback) => {
  db.query(sqlAllAssetFull, [id], (err, results) => {
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

const typeAsset = 'SELECT cate_name as name FROM category ';
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
