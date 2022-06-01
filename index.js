/*
const fs = require('fs');

const express = require('express');

const app = express();

app.use(morgan('dev'));
 
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello  from middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
// const server = http.createServer((req, res) => {
//   console.log(req.url);

//   const pathName = req.url;
//   //overview pa
//   if (pathName === '/overview' || pathName === '/') {
//     res.end('This is the overvieW');
//   } else if (pathName === '/product') {
//     res.end('This is proxduct');
//   } else {
//     res.end('Page not found');
//   }
//   //res.end('Hello from server');
// });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to port 8000');
// });
*/
const express = require('express');

const { toUSVString } = require('util');
const morgan = require('morgan');
const articleRouter = require('./routers/articleRouters');
const userRouter = require('./routers/userRouters');
const { get } = require('http');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next)=> { 
    console.log('Hello from middleware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server', app: 'SportsDaily' });
// });
// app.post('/', (req, res) => {
//     res.send('You can post here');
//




//Routes



app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

// app.get('/api/v1/articles', getAllArticles);
// app.get('/api/v1/articles/:id', getOneArticle);
// app.post('/api/v1/articles', postArticle);
// app.patch('/api/v1/articles/:id', patchArticle);
// app.delete('/api/v1/articles/:id', deleteArticle);

//start server

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });

module.exports = app;