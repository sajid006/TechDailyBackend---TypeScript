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

sendResponse = (req, res, inputData) => {
  return res.format({
    'application/json': function () {
      res.send(jsonData(inputData));
    },

    'application/xml': function () {
      res.send(xmlData(inputData));
    },

    'text/plain': function () {
      res.send(textData(inputData));
    },

    'text/html': function () {
      res.send(htmlData(inputData));
    },

    default: function () {
      res.status(406).send('Not Acceptable');
    },
  });
};
module.exports = {jsonData, xmlData, htmlData, xmlData, sendResponse};
/*
const json2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const json2plainText = require('json-to-plain-text');

const sendJsonResponse = (req, res, statusCode, data, message, status) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const sendXmlResponse = (req, res, statusCode, data, message, status) => {
  res.setHeader('content-type', 'application/xml');
  const xmlData = json2xmlparser.parse('data', {
    status,
    message,
    data,
  });
  return res.status(statusCode).send(xmlData);
};

const sendHTMLResponse = (req, res, statusCode, data, message, status) => {
  res.setHeader('content-type', 'text/html');
  const htmlData = json2html({
    status,
    message,
    data,
  });
  return res.status(statusCode).send(htmlData);
};

const sendTextResponse = (req, res, statusCode, data, message, status) => {
  res.setHeader('content-type', 'text/plain');
  const jsonData = JSON.parse(
    JSON.stringify({
      status,
      message,
      data,
    })
  );
  const plainTextData = json2plainText.toPlainText(jsonData);
  return res.status(statusCode).send(plainTextData);
};

module.exports = (req, res, statusCode, data, message, status) => {
  if (!status) status = 'success';
  if (req.headers.accept === 'application/xml')
    sendXmlResponse(req, res, statusCode, data, message, status);
  else if (req.headers.accept === 'text/html')
    sendHTMLResponse(req, res, statusCode, data, message, status);
  else if (req.headers.accept === 'text/plain')
    sendTextResponse(req, res, statusCode, data, message, status);
  else sendJsonResponse(req, res, statusCode, data, message, status);
};
*/
