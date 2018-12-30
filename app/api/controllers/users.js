const connection = require('../../../config/DbConnection'); //importing class along creating object

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

function hashBack(password) {
    return bcrypt.hashSync(password, saltRounds);
}


module.exports = {
    create: async function (req, res, next) {

        if (req.query.name == null || req.query.email == null || req.query.password == null) {
            res.json({
                message: 'you have to provide name ,email and password  query params'
            });
        } else {
            let sql = "INSERT INTO `users`(name,email, password)   VALUES (?,?,?) ";




            connection.query(sql, [req.query.name, req.query.email, hashBack(req.query.password)], (err) => {
                if (err) throw err;

                res.json({
                        status: "success",
                        message: "Data Has been Inserted into users Successfully",
                        data: null
                    }

                );
            });
        }
    },
    authenticate: async function (req, res, next) {

        if (req.query.email == null || req.query.password == null) {
            res.json({
                status: "error",
                message: 'you have to provide name ,email and password  query params'
            }.status(404));
        } else {
            let sql = "Select * FROM  users WHERE  email = ? ";




            connection.query(sql, [req.query.email], (err, results, fields) => {
                if (err) throw err;
                console.log(results);


                if (results.length === 0) {
                    res.json({
                        status: "error",
                        "message": "Data doesn't match"
                    })
                }

                const validPassword = bcrypt.compareSync(req.query.password, results[0].password);

                if (validPassword) {
                    const token = jwt.sign({
                        id: results.id
                    }, req.app.get('secretKey'), {
                        expiresIn: '100y'
                    });

                    res.json({
                        status: "success",
                        message: "user found!!!",
                        data: {
                            user: results,
                            token: token
                        }
                    }).status(200);
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid email/password!!!",
                        data: null
                    }).status(400);
                }
            });
        }
    }
}