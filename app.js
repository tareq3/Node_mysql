const express = require('express');

const bodyParser = require('body-parser');


const morgan = require('morgan');

const cors = require('cors');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

//importing the router
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');

// Implementation starts here or Initialization
const app = express();

app.set("secretKey", "nodeRestApi"); // jwt secret token

app.use(morgan('dev')); //for logging
app.use(cors()); //for public api 



/* ********* Body Parser Init ******** */
//parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//For any call first test authentication
/*app.use(verifyToken, (req, res, next) => {

            //Here verify token will be executed first then the following lines

            jwt.verify(req.token, 'secretkey', (err, authData) => {
                        if (err) {
                            res.sendStatus(403);
                        } else {

                            /*  res.status(200).json({
                message: 'Authenticated access',
                authData
            });
 */
//if authentication ok then go for next
/*                                    next();

        }
    });

}); */

function validateUser(req, res, next) {
    jwt.verify(req.token,
        req.app.get["secretKey"],
        (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {

                // add user id to request
                req.body.userId = decoded.id;
                next();

            }

        }
    );
}



//public route
app.use('/api/users', userRouter);

//private route
app.use('/api/posts', validateUser, postRouter);



//json web token

app.post('/api/login', (req, res) => {

    if (!req.query.email || !req.query.pass) {
        res.json({
            message: "must add email and pass as query params"
        });
    } else {

        jwt.sign({
            user: {

                u_email: req.query.email,
                u_pass: req.query.pass
            }
        }, req.app.get["secretKey"],{expiresIn: '100y'}, (err, token) => {
            res.json({
                token
            });
        });

    }
});




//Format of token
//Authoprization : Bearer <access_token>

//Verify token
function verifyToken(req, res, next) {
    //get Auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer header is undefined 
    if (typeof bearerHeader !== 'undefined') {

        //Split at the space
        const bearer = bearerHeader.split(' ');

        //Get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        ///next Middleware
        next(); //stop execution and call next 

    } else {
        //forbidden
        res.json({
            success: 'false',
            message: 'authorization is not defined'
        });
    }

}

//Basic get Call
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Monica Server started at 4000 port'
    });
});



app.listen('4000', () => {
    console.log("Monica Server started on port 4000");

});