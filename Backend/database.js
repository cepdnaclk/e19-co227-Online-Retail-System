const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit: 10,
    host:"localhost",
    user : "root",
    password: "",
    database: "online_retail_system"
});

// Attempt to connect to the database
connection.getConnection((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database!');
});

module.exports = connection;
