const express = require('express');

const router = express.Router();

const connection = require('../config/DbConnection'); //importing class along creating object

const userController = require('../app/api/controllers/users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// post Post call using Query Params:

router.post('/register', userController.create);

// post Post call using Query Params:

router.post('/authenticate', userController.authenticate);

//Get Data as rows using sql 
router.get('/', (req, res, next) => {


    let sql = "SELECT* FROM users";


    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            var response = [];

            if (rows.length != 0) {
                response.push({
                    'result': 'success',
                    'data': rows
                });
            } else {
                response.push({
                    'result': 'error',
                    'msg': 'No Results Found'
                });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });


});


//update Token

router.put('/', (req, res, next) => {


    if (req.query.email == null || req.query.token == null) {
        res.json({
            message: 'you have to provide email, token query params'
        });
    } else {

        let sql = "UPDATE users SET token=? WHERE  email = ? ";


        connection.query(sql, [req.query.token, req.query.email], (err, rows, fields) => {
            if (!err) {
                var response = [];

                if (rows.length != 0) {
                    response.push({
                        'result': 'success',
                        'data': rows
                    });
                } else {
                    response.push({
                        'result': 'error',
                        'msg': 'No Results Found'
                    });
                }

                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    }

});

module.exports = router;