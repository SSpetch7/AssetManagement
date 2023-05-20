import requestModel from '../models/routeModel.js';

const requestController = {
    getAllRequestList: (req, res) => {
        requestModel.getAllRequests((err, requests) => {
            if (err) res.send(err);
            res.json({ data: requests });
        });
    },
    getRequestByID: (req, res) => {
        const id = req.params.id;

        if (req.query.asset == 'true') {
            requestModel.getRequestAssetByID(id, (err, request) => {
                if (err) res.send(err);
                res.json({ data: request });
            });
            return;
        }

        requestModel.getRequestByID(id, (err, request) => {
            if (err) res.send(err);
            res.json({ data: request });
        });
    },
    createRequest: (req, res) => {
        const data = [
            req.body.user_email, 
            req.body.asset_id, 
            req.body.reqStatus, 
            req.body.dateWant, 
            req.body.dateDue,
            req.body.userNote, 
            req.body.adminNote, 
        ];

        requestModel.createRequest(data, (err, _) => {
            if (err) res.send(err);
            res.status(200).send("Insert Request Success");
        })
    }
};

export default { requestController };
