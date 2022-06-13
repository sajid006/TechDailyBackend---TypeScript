//Check if the there is any user with this ID
// == move these functions to middlewares\

const services = require('../services/userServices');
const catchAsync = require('../utils/catchAsync');

exports.checkUsername = async (req, res, next) => {
      const value = req.params.id;
      console.log(`Username ${value}`);
      const noOfUser = await services.validateUser(value);
      console.log(noOfUser); // === replace all console logs with winston logging methods
      if (noOfUser < 1) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalidd Id',
        });
      }
    
    next();
  };
  
  //Check if the request contains the mandatory fields
  exports.checkBody = (req, res, next) => {
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({
        status: 'fail',
        message: 'name or email missing',
      });
    }
    next();
  };