// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'database-1.cahetcpy6jpz.us-east-1.rds.amazonaws.com',
    user: 'awsdb',
    database: 'testdb',
    password: 'password'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

module.exports = connection.promise()
