const userModel = require('../models/userModel');
const users = userModel.users;

exports.validateUser = async (value) => {
    const validUsers = await users.findOne({
        where: {
            username: `${value}`,
        },
    });
    if (validUsers) return 1;
    else return 0;
};

exports.findAllUsers = async () => {
    const usersList = await users.findAll();
    return usersList;
};

exports.findOneUser = async (username) => {
    const user = await users.findOne({
        where: {
            username: username,
        },
    });

    return user;
};

exports.createUser = async (userData) => {
    const { username, name, email, password } = userData;
    const newUser = await users.create({ username, name, email, password });
    return newUser;
};

exports.updateUser = async (username, name, email) => {
    const myUser = await users.update(
        { email, name },
        {
            where: {
                username,
            },
        }
    );
    return myUser;
};

exports.removeUser = async (username) => {
    const deleted = users.destroy({
        where: {
            username,
        },
    });
    return deleted;
};
