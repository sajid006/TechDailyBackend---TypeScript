//--Mandatory
//zip data that is very big
//Content negotiation
//give correct status code

//--Optional
//Complete jwt authentication
//Check password change after issuing token

const X2JS = require('x2js');
const JS2PT = require('json-to-plain-text');
const json2html = require('json-to-html');

jsonData = (inputData) => {
  return JSON.parse(JSON.stringify(inputData));
};

xmlData = (inputData) => {
  var x2js = new X2JS();
  var myXML = x2js.js2xml(JSON.parse(JSON.stringify(inputData)));
  return myXML;
};

textData = (inputData) => {
  return JS2PT.toPlainText(JSON.parse(JSON.stringify(inputData)));
};

htmlData = (inputData) => {
  return json2html(JSON.parse(JSON.stringify(inputData)));
};

sendResponse = (req, res, inputData,statuscode) => {
  if(!statuscode)statuscode = 200;
  return res.format({
    'application/json': function () {
      res.status(statuscode).send(jsonData(inputData));
    },

    'application/xml': function () {
      res.status(statuscode).send(xmlData(inputData));
    },

    'text/plain': function () {
      res.status(statuscode).send(textData(inputData));
    },

    'text/html': function () {
      res.status(statuscode).send(htmlData(inputData));
    },

    default: function () {
      res.status(406).send('Not Acceptable');
    },
  });
};
module.exports = {sendResponse};












