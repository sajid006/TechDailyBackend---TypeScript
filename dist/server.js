"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const index_1 = require("./index");
const PORT = 3000;
index_1.default.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
/*
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello Sajid again!!!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
*/
