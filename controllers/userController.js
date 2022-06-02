

const databaseRouter = require("../database");

//Route handler for users
//const users = pool.query();


exports.getAllUsers = (req, res) => {
    app.use('/api/v1/users', databaseRouter);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        users: 
      },
    });
};
exports.postUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.getOneUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
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

