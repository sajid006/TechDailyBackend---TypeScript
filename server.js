const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./index');


//console.log(app.get('env'));
//console.log(process.env);
//const port = process.env.PORT || 3000;

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
