const mysql = require('mysql2');

//vmserver root password is : Rakib@72542
//Create connection
const connection = mysql.createConnection({
    host: "mysql1",
    port: '3306',
    user: "tareq",
    password: '123456',
    database: 'post_db'
});

//Connect  
connection.connect((err) => {
    if (err) {
        console.log('Database Connetion failed:' + err);
        throw err;
    }
    console.log('Mysql Connected');

});

module.exports = connection;