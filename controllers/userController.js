const services = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Read all users
exports.getAllUsers = async (req, res) => {
  //console.log(users);
  try {
    const allUsers = await services.findAllUsers();
    console.log('All the users', allUsers);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        users: allUsers,
      },
    });
  } catch {
    res.status(404).json({
      error: 'User List not found',
    });
  }
};

//Read one user
exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const myUser = await services.findOneUser(id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: JSON.stringify(myUser),
      },
    });
  } catch {
    res.status(404).json({
      error: 'User not found',
    });
  }
};

//Create a user
exports.postUser = async (req, res) => {
  //console.log('lkdslsdlds');
  try {
    let userData = {
      username: null,
      name: null,
      email: null,
      password: null,
    };
    //console.log('hiji');
    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.hashedPassword = await bcrypt.hash(req.body.password, 10);
    //userData.hashedPassword = "3";
    userData.username = req.body.username;
    console.log(userData);
    const newUser = await services.createUser(userData);
    //console.log('biiji');
    console.log('First user created:', newUser);
    console.log(JSON.stringify(newUser));
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: JSON.stringify(newUser),
      },
    });
  } catch {
    res.status(400).json({
      error: 'User creation failed',
    });
  }
};




//Update a user
exports.patchUser = async (req, res) => {
  try {
    const username = req.body.username;
    const name = req.body.name;
    const id = req.params.id;
    const myUser = await services.updateUser(id, username, name);
    console.log('User updated', myUser);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: JSON.stringify(myUser),
      },
    });
  } catch {
    res.status(401).json({
      error: 'User update failed',
    });
  }
};

//Delete a user
exports.deleteUser = async(req, res) => {
  try{
    const id = req.params.id;
    const deleteResult = await services.removeUser(id);
    console.log('User deleted', deleteResult);
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: id,
      },
    });
  }
  catch {
    res.status(401).json({
      error: 'User delete failed',
    });
  }
  
};
