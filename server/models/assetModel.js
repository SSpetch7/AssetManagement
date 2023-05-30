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

const sqlAllAsset = `SELECT *,c.cate_id AS categoryID ,c.cate_name AS category, s.sub_id AS subcategoryID ,s.sub_name AS subcategory from asset_detail as a
LEFT JOIN category c ON a.cate_id = c.cate_id
LEFT JOIN subcate s ON a.sub_id = s.sub_id WHERE NOT a.asset_status = 'แทงจำหน่าย'  ORDER BY asset_order ASC`;

Asset.getAllAsset = (result) => {
  db.query(sqlAllAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('asset_detail fetching successfully');
      result(null, res);
    }
  });
};
const sqlAssetByID = `SELECT *,c.cate_id AS categoryID ,c.cate_name AS category, s.sub_id AS subcategoryID ,s.sub_name AS subcategory from asset_detail as a
LEFT JOIN category c ON a.cate_id = c.cate_id
LEFT JOIN subcate s ON a.sub_id = s.sub_id WHERE NOT a.asset_status = 'แทงจำหน่าย' AND a.asset_id = ?  ORDER BY asset_order ASC`;
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

const sqlDisposaledAsset = `SELECT *,c.cate_id AS categoryID ,c.cate_name AS category, s.sub_id AS subcategoryID ,s.sub_name AS subcategory from asset_detail as a
LEFT JOIN category c ON a.cate_id = c.cate_id
LEFT JOIN subcate s ON a.sub_id = s.sub_id WHERE a.asset_status = 'แทงจำหน่าย'  ORDER BY asset_order ASC`;
Asset.getDisposaledAsset = (result) => {
  db.query(sqlDisposaledAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('asset_detail fetching successfully');
      result(null, res);
    }
  });
};

const statusState =
  'SELECT status_name as name FROM status_state WHERE status_id < 4';
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
      //   console.log('Asset fetching successfully');
      //   result(null, res);
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
      const statusValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, statusValues);
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
      //   console.log('Asset fetching successfully');
      //   result(null, res);
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
      const typeValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, typeValues);
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
