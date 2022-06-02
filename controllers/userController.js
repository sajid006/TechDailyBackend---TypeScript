

const express = require("express");
const databaseRouter = require("../connection");

//Route handler for users
//const users = pool.query();

//const users = databaseRouter;
exports.getAllUsers = (req, res) => {
    //console.log(users);
    databaseRouter.query("SELECT * from users", (err, rows, fields) => {
        if(!err) {
            res.status(200).json({
                status: 'success',
                requestedAt: req.requestTime,
                data: {
                  users: JSON.stringify(rows)
                },
              });
        }
        else{
            console.log(err);
        }
    })
    
};
exports.postUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.getOneUser = (req, res) => {
    const id = req.params.id * 1;
    databaseRouter.query("SELECT * from users where id=?", id, (err, rows, fields) => {
        if(!err) {
            res.status(200).json({
                status: 'success',
                requestedAt: req.requestTime,
                data: {
                  users: JSON.stringify(rows)
                },
              });
        }
        else{
            console.log(err);
        }
    })
};
exports.patchUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

