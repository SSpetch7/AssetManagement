import db from '../config/db.js';

var EachRoom = (asset) => {
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
  'SELECT cate_name, COUNT("cate_name") as total_asset FROM asset_detail a LEFT JOIN category c ON a.cate_id = c.cate_id WHERE cate_name IS NOT NULL GROUP BY cate_name ORDER BY cate_name';
EachRoom.getNumberAsset = (result) => {
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

const numberAssetByRoom =
  'SELECT cate_name, COUNT("cate_name") as total_asset FROM asset_detail a LEFT JOIN category c ON a.cate_id = c.cate_id WHERE cate_name IS NOT NULL AND room_id = ? GROUP BY cate_name ORDER BY cate_name';
EachRoom.getNumberAssetByRoom = (room_id, result) => {
  db.query(numberAssetByRoom, [room_id], (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};
export default EachRoom;
