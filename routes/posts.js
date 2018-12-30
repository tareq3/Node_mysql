const express = require('express');

const router = express.Router();

const connection = require('../config/DbConnection'); //importing class along creating object


//Get Data as rows using sql 
router.get('/', (req, res, next) => {


    let sql = "SELECT title, body FROM `posts` ";


    connection.query(sql, [25], (err, rows, fields) => {
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





// post Post call using Query Params:

router.post('/', (req, res, next) => {

    if (req.query.title == null || req.query.body == null) {
        res.json({
            message: 'you have to provide title and body query params'
        });
    } else {
        let sql = "INSERT INTO `posts`   SET ? ";

        let values = {
            title: req.query.title,
            body: req.query.body
        };

        connection.query(sql, values, (err) => {
            if (err) throw err;

            res.send("Data Has been Inserted Successfully");
        });
    }
});



router.put('/', (req, res, next) => {


    if (req.query.title == null || req.query.id == null) {
        res.json({
            message: 'you have to provide title and id query params'
        });
    } else {

        let sql = "UPDATE posts SET title=? WHERE  id < ? AND title IS  NULL";


        connection.query(sql, [req.query.title, req.query.id], (err, rows, fields) => {
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

//DElete Route Call
router.delete('/', (req, res, next) => {


    if (req.query.id == null) {
        res.json({
            message: 'you have to provide  id query params'
        });
    } else {

        let sql = "DELETE FROM  posts WHERE  id = ? ";


        connection.query(sql, [req.query.id], (err, rows, fields) => {
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