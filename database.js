/*
const createConnection = require('mysql');

//const createPool = createConnection.createPool();

const pool = createConnection.createPool({
    host: "localhost",
    user: "root",
    password:"",
    database: "sportsdaily",
    connectionLimit: 10
});

// pool.query(`select * from users where id = ?`, [1],  (err, result) => {

pool.query(`select * from users`, (err, result) => {
    if(err) {
        return console.log(err);
    }
    createConnection.users = JSON.stringify(result);
    //console.log(createConnection.users);
    return createConnection.users;   
});

module.exports = createConnection;
*/

const express = require("express");
//const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
//const userRoutes =require("../users");

const router = express.Router();

router.get("/", (req, res) => {
    mysqlConnection.query("SELECT * from users", (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

module.exports = router;

