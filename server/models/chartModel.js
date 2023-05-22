import db from '../config/db.js';

var Chart = (asset) => {
  this.asset_order = asset.asset_order;
  this.asset_id = asset.asset_id;
  this.asset_name = asset.asset_name;
  this.asset_year = asset.asset_year;
  this.gallery_id = asset.gallery_id;
  this.detail_id = asset.detail_id;
  this.asset_useable = asset.asset_useable;
  this.asset_stock = asset.asset_stock;
  this.asset_status = asset.asset_status;
  this.room_id = asset.room_id;
  this.cate_id = asset.cate_id;
  this.sub_id = asset.sub_id;
};

const numberAsset =
  'SELECT cate_name, COUNT("cate_name") as total_asset FROM asset_detail a LEFT JOIN category c ON a.cate_id = c.cate_id GROUP BY cate_name ORDER BY cate_name';
Chart.getNumberAsset = (result) => {
  db.query(numberAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const numberAssetCate =
  'SELECT c.cate_name AS category_name, COUNT(c.cate_name) AS total_asset FROM asset_detail a LEFT JOIN category c ON a.cate_id = c.cate_id GROUP BY c.cate_name UNION SELECT s.sub_name COLLATE utf8mb4_general_ci AS category_name, COUNT(s.sub_name) AS total_subasset FROM asset_detail a INNER JOIN subcate s ON a.sub_id = s.sub_id GROUP BY s.sub_name ORDER BY category_name ASC';
Chart.getNumberAssetCate = (result) => {
  db.query(numberAssetCate, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const yearAsset =
  'SELECT asset_year, COUNT("asset_year") as total_asset_in_year FROM asset_detail GROUP BY asset_year ORDER BY asset_year DESC';
Chart.getYearAsset = (result) => {
  db.query(yearAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const numberStatus =
  'SELECT status_name, COUNT("status_name") as total_status FROM asset_detail a JOIN status_state AS s ON a.asset_status = s.status_id GROUP BY status_name ORDER BY status_name';
Chart.getNumberStatus = (result) => {
  db.query(numberStatus, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

export default Chart;
