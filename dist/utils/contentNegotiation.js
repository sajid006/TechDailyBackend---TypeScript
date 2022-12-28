"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
import * as json2html from 'node-json2html';
import * as X2JS from 'x2js';
const JS2PT = require('json-to-plain-text');
//import * as JS2PT from 'json-to-plain-text';
//import * as json2html from 'json-to-html';


/*
const xmlData = (inputData: any) => {
  const x2js = new X2JS();
  const myXML = x2js.js2xml(JSON.parse(JSON.stringify(inputData)));
  return myXML;
};

const textData = (inputData: any) => {
  return JS2PT.toPlainText(JSON.parse(JSON.stringify(inputData)));
};

const htmlData = (inputData: any) => {
  return json2html.render(JSON.parse(JSON.stringify(inputData)), []);
};
*/
const jsonData = (inputData) => {
    return JSON.parse(JSON.stringify(inputData));
};
const sendResponse = (req, res, inputData, statuscode) => {
    if (!statuscode)
        statuscode = 200;
    return res.format({
        'application/json': function () {
            res.status(statuscode).send(jsonData(inputData));
        },
        'application/xml': function () {
            res.status(statuscode).send(jsonData(inputData));
        },
        'text/plain': function () {
            res.status(statuscode).send(jsonData(inputData));
        },
        'text/html': function () {
            res.status(statuscode).send(jsonData(inputData));
        },
        default: function () {
            res.status(statuscode).send(jsonData(inputData));
        },
    });
};
//module.exports = { jsonData, xmlData, textData, htmlData, sendResponse };
exports.default = sendResponse;
