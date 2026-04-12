const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (!err) {
        console.log("Server has successfully established a connection with the database.");
    }
    else {
        console.log(`Server has failed to establish a connection with the database:\n${err}`);
    }
})

module.exports = connection;