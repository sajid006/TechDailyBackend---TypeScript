

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
    const id = req.body.id;
    //const username = req.body.id;
    //const fullname = req.body.id;
    //const signuptime = req.body.id;
    //const password = req.body.id;
    databaseRouter.query("INSERT INTO `users` (`id`, `username`, `fullname`, `signuptime`, `password`) VALUES (?)", id, (err, rows, fields) => {
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

