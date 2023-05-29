import db from '../config/db.js';

var Room = (asset) => {
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

const roomGroupBy =
  'SELECT  DISTINCT room_id as room_name FROM asset_detail WHERE room_id IS NOT NULL ORDER BY room_id ';
Room.getRoom = (result) => {
  db.query(roomGroupBy, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      const roomValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, roomValues);
    }
  });
};

export default Room;
