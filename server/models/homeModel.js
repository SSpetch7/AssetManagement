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

const statusANotebook =
  'SELECT  COUNT("asset_status") as status_number_notebook FROM asset_detail WHERE sub_id=2 AND asset_status="ใช้งานได้" ';
Home.getStatusANotebook = (result) => {
  db.query(statusANotebook, (err, res) => {
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

const statusBNotebook =
  'SELECT  COUNT("asset_status") as status_number_notebook FROM asset_detail WHERE sub_id=2  AND asset_status="รอซ่อม"';
Home.getStatusBNotebook = (result) => {
  db.query(statusBNotebook, (err, res) => {
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
const statusCNotebook =
  'SELECT  COUNT("asset_status") as status_number_notebook FROM asset_detail WHERE sub_id=2 AND asset_status="สิ้นสภาพ"';
Home.getStatusCNotebook = (result) => {
  db.query(statusCNotebook, (err, res) => {
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

const statusATablet =
  'SELECT  COUNT("asset_status") as status_number_tablet FROM asset_detail WHERE sub_id=3 AND asset_status="ใช้งานได้"';
Home.getStatusATablet = (result) => {
  db.query(statusATablet, (err, res) => {
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
const statusBTablet =
  'SELECT  COUNT("asset_status") as status_number_tablet FROM asset_detail WHERE sub_id=3 AND asset_status="รอซ่อม"';
Home.getStatusBTablet = (result) => {
  db.query(statusBTablet, (err, res) => {
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
const statusCTablet =
  'SELECT  COUNT("asset_status") as status_number_tablet FROM asset_detail WHERE sub_id=3 AND asset_status="สิ้นสภาพ"';
Home.getStatusCTablet = (result) => {
  db.query(statusCTablet, (err, res) => {
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

export default Home;
