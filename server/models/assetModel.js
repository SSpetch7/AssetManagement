import db from '../config/db.js';

var Asset = function (asset) {
  this.asset_order = asset.asset_order;
  this.asset_id = asset.asset_id;
  this.asset_name = asset.asset_name;
  this.asset_year = asset.asset_year;
  this.gallery_id = asset.gallery_id;
  this.detail = asset.detail;
  this.asset_useable = asset.asset_useable;
  this.asset_stock = asset.asset_stock;
  this.asset_status = asset.asset_status;
  this.room_id = asset.room_id;
  this.cate_id = asset.cate_id;
  this.sub_id = asset.sub_id;
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

const sqlAssetASC = `SELECT ${selectColAC}, c.cate_name AS category, s.sub_name AS subcategory,state.sck_name,state.s_name,state.u_name
FROM asset_detail a
LEFT JOIN category c ON a.cate_id = c.cate_id
LEFT JOIN subcate s ON a.sub_id = s.sub_id 
JOIN (${assetJoinState}) as state ON a.asset_id = state.asset_id ORDER BY asset_order ASC`;
// const sqlAssetASC = `SELECT ${selectColAsset} FROM (${assetJoinState}) as ajs  ORDER BY asset_order ASC`; // yes

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
      const statusValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, statusValues);
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
      const useableValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, useableValues);
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

const typeComAsset = 'SELECT sub_name as subcategory FROM subcate ';
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

// Update Model
Asset.updateAsset = (asset_id, assetReqData, result) => {
  db.query(
    'UPDATE asset_detail SET asset_order=?,asset_id=?,asset_name=?,asset_year=?,gallery_id=?,detail=?,asset_useable=?,asset_stock=?,asset_status=?,room_id=?,cate_id=?,sub_id=? WHERE asset_id=?',
    [
      assetReqData.asset_order,
      assetReqData.asset_id,
      assetReqData.asset_name,
      assetReqData.asset_year,
      assetReqData.gallery_id,
      assetReqData.detail,
      assetReqData.asset_useable,
      assetReqData.asset_stock,
      assetReqData.asset_status,
      assetReqData.room_id,
      assetReqData.cate_id,
      assetReqData.sub_id,
      asset_id,
    ],
    (err, res) => {
      console.log('...', asset_id);
      console.log('...', assetReqData);
      console.log('...', result);
      console.log('...', res);
      if (err) {
        console.log('Error while updating the asset', err);
        result(null, err);
      } else {
        console.log('Asset updating successfully');
        result(null, res);
      }
    }
  );
};

// Delete Model
Asset.deleteAsset = (id, result) => {
  db.query('DELETE FROM asset_detail WHERE asset_id=?', [id], (err, res) => {
    if (err) {
      console.log('Error while deleting the asset');
      result(null, err);
    } else {
      console.log('Error while deleting the asset');
      result(null, res);
    }
  });
};

// create new asset
const insertAsset = 'INSERT INTO asset_detail SET ?';
Asset.createAsset = (assetReqData, result) => {
  db.query(insertAsset, assetReqData, (err, res) => {
    if (err) {
      console.log('Error while inserting data', err);
      result(null, err);
    } else {
      console.log('Employee created successfully');
      result(null, res);
    }
  });
};

const sqlLatestOrder =
  'SELECT asset_order FROM asset_detail ORDER BY asset_order DESC LIMIT 1';

const tteset =
  'SELECT a.asset_id, a.asset_name, a.asset_description, COUNT(o.asset_id) AS order_count FROM assets a LEFT JOIN orders o ON a.asset_id = o.asset_id GROUP BY a.asset_id, a.asset_name, a.asset_description ORDER BY order_count DESC;';
Asset.getLOrder = (result) => {
  db.query(sqlLatestOrder, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      const numValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, numValues);
    }
  });
};

export default Asset;
