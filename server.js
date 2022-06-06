const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./index');

const port = 3000;

// app.get('/', (req, res) => {
//   res.send(a);
// })



app.use((err, req, res, next) => {
  if(res.headersSend){
    next('There was a problem');
  }
  else if (err.message) {
    console.log(err);
    res.send(err.message);
  } 
  else {
    res.status(500).send('There was an error on server side');
  }
});


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
