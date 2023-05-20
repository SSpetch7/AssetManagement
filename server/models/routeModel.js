import db from '../config/db.js';

var Request = (request) => {
  this.req_id = request.req_id;
  this.user_id = request.user_id;
  this.asset_id = request.asset_id;
  this.userNote = request.userNote;
  this.reqStatus = request.reqStatus;
  this.adminNote = request.adminNote;
  this.dateReq = request.dateReq;
  this.dateWant = request.dateWant;
  this.dateDue = request.dateDue;
};

const getAllRequests = `
SELECT * 
FROM request 
ORDER BY req_id ASC
`;

const getRequestByID = `
SELECT *
FROM request
WHERE req_id = ?
`;

const getRequestAssetByID = `
SELECT *
FROM request
LEFT JOIN asset_detail ON request.asset_id = asset_detail.asset_id
WHERE req_id = ?
`;

const createRequest = `
INSERT INTO request (user_email, asset_id, userNote, reqStatus, adminNote, dateWant, dateDue)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

Request.getAllRequests = (callback) => {
    db.query(getAllRequests, (err, res) => {
        if (err) {
            console.log("Error while fetching request", err);
            callback(null, err);
        }
        console.log("Requests fetching successfully");
        callback(null, res);
    })
}

Request.getRequestByID = (id, callback) => {
    db.query(getRequestByID, id, (err, res) => {
        if (err) {
            console.log('Error while fetching request ', err);
            return callback(err, null);
        }
        console.log('Requests fetching successfully');
        return callback(null, res);
    });
}

Request.getRequestAssetByID = (id, callback) => {
    db.query(getRequestAssetByID, id, (err, res) => {
        if (err) {
            console.log('Error while fetching request ', err);
            return callback(err, null);
        }
        console.log('Requests fetching successfully');
        return callback(null, res);
    });
}

Request.createRequest = (data, callback) => {
    db.query(createRequest, data, (err) => {
        if (err) {
            console.log('Error while fetching request ', err);
            return callback(err, null);
        }
        console.log('Requests inserted successfully');
        return callback(null);
    });
  };

export default Request;
