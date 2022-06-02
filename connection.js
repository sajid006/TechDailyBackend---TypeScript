const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "sportsdaily",
    connectionLimit: 10
});

mysqlConnection.connect((err)=> {
    if(!err) {
        console.log("Connected");
    }
    else{
        console.log("FAILEd");
    }
});

module.exports = mysqlConnection;