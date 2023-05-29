import db from '../config/db.js';

var Dropdown = (asset) => {
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

const yearAsset =
  'SELECT DISTINCT asset_year as year FROM asset_detail ORDER BY asset_year ASC';
Dropdown.getYear = (result) => {
  db.query(yearAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      const yearValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, yearValues );
    }
  });
};

const yearSelectAsset =
  'SELECT * FROM asset_detail WHERE asset_year=?';
Dropdown.getAssetByYear = (id, result) => {
  db.query(yearSelectAsset, [id], (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const roomAsset =
  'SELECT DISTINCT room_id as year FROM asset_detail';
Dropdown.getRoom = (result) => {
  db.query(roomAsset, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      const roomValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, roomValues );
    }
  });
};

const roomSelectAsset =
  'SELECT * FROM asset_detail WHERE room_id=?';
Dropdown.getAssetByRoom = (id, result) => {
  db.query(roomSelectAsset, [id], (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

export default Dropdown;
