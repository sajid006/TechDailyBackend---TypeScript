const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./index');

const port = 3000;

app.use((err, req, res, next) => {
  console.log(err);
  if(res.headersSend) {
    return next(err);
  }
  else if (err) {
    console.log(err);
    res.status(404).send("Not found");
  } 
  else {
    res.status(500).send('There was an error on server side');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
