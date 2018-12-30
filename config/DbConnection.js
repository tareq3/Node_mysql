const mysql = require('mysql2');

//vmserver root password is : Rakib@72542
//Create connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'node_mysql_db'
});

//Connect  
connection.connect((err) => {
    if (err) {
        console.log('Database Connetion failed:' + e);
        throw err;
    }
    console.log('Mysql Connected');

});

module.exports = connection;