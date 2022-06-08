const auth = require("basic-auth");
const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {username, userId} = decoded;
        req.username = username;
        req.userId = userId;
        next();
    }
    catch(err){
        next("Authentication failed");
    }
}

// === validation should be done in models/any other utility function
// === Refactor this method
//Validate a user
exports.validatetUser = (req, res) => {
    //const name = req.body.name;
    //const email = req.body.email;
    //const password = req.body.password;
    //const hashedPassword = bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return user.findAll({
          where: {
            username: `${username}`,
          },
        });
      })
      .then(async (user1) => {
        try {
          console.log(user1.length);
          if (user1 && user1.length > 0) {
            const isValidPassword = await bcrypt.compare(
              req.body.password,
              user1[0].password
            );
  
            if (isValidPassword) {
              //console.log("yo");
              const token = jwt.sign(
                {
                  username: user1[0].username,
                  Name: user1[0].name,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: '1h',
                }
              );
              console.log(user1[0]);
              res.status(200).json({
                access_token: token,
                message: 'Login successful',
              });
            } else {
              res.status(401).json({
                error: 'Authentication failed',
              });
            }
          } else {
            res.status(401).json({
              error: 'Authentication failed',
            });
          }
        } catch {
          res.status(401).json({
            error: 'Authentication failed',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
