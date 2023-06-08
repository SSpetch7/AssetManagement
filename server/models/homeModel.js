import db from '../config/db.js';

var Home = (asset) => {
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

const numberNotebook =
  'SELECT COUNT("sub_id") as total_notebook FROM asset_detail WHERE sub_id=2 GROUP BY sub_id';
Home.getNumberNotebook = (result) => {
  db.query(numberNotebook, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      const nbValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, nbValues);
    }
  });
};

const statusNotebook =
  'SELECT asset_status, COUNT("asset_status") as status_number_notebook FROM asset_detail WHERE sub_id=2 GROUP BY asset_status';
Home.getStatusNotebook = (result) => {
  db.query(statusNotebook, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

const numberTablet =
  'SELECT COUNT("sub_id") as total_tablet FROM asset_detail WHERE sub_id=3 GROUP BY sub_id';
Home.getNumberTablet = (result) => {
  db.query(numberTablet, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      const tlValues = res.reduce((values, row) => {
        return values.concat(Object.values(row));
      }, []);
      return result(null, tlValues);
    }
  });
};

const statusTablet =
  'SELECT asset_status, COUNT("asset_status") as status_number_tablet FROM asset_detail WHERE sub_id=3 GROUP BY asset_status';
Home.getStatusTablet = (result) => {
  db.query(statusTablet, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('Asset fetching successfully');
      result(null, res);
    }
  });
};

export default Home;
