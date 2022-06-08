//Check if the there is any user with this ID
// == move these functions to middlewares\
exports.checkID = async (req, res, next) => {
    try {
      const value = req.params.id;
      console.log(`User id ${value}`);
      const noOfUser = await services.validateID(value);
      console.log(noOfUser); // === replace all console logs with winston logging methods
      if (noOfUser < 1) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalidd Id',
        });
      }
    } catch {
      res.status(401).json({
        error: 'ID not found',
      });
    }
    next();
  };
  
  //Check if the request contains the mandatory fields
  exports.checkBody = (req, res, next) => {
    if (!req.body.username || !req.body.name) {
      return res.status(400).json({
        status: 'fail',
        message: 'username/name missing',
      });
    }
    next();
  };