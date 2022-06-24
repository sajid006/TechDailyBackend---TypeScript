const contentNegotiation = require('../../utils/contentNegotiation');
const httpMocks = require('node-mocks-http');
const mUsers = require('../mockData/mUsers');

const jeson = {
  username: 'sajid1',
  name: 'Sajid Hasan',
  email: 'sajid1@id.com',
  password: '$2b$10$G.vWTLfgzdjo1JjpiJMO2.bUKXL/KvsuygBAd1QvWUepuoXpr8QK6',
  createdAt: '2022-06-21T06:08:44.000Z',
  updatedAt: '2022-06-21T06:08:44.000Z',
};

const xml = `<username>sajid1</username><name>Sajid Hasan</name><email>sajid1@id.com</email><password>$2b$10$G.vWTLfgzdjo1JjpiJMO2.bUKXL/KvsuygBAd1QvWUepuoXpr8QK6</password><createdAt>2022-06-21T06:08:44.000Z</createdAt><updatedAt>2022-06-21T06:08:44.000Z</updatedAt>`;

const html = `{
  <span class="string key">"username"</span>: <span class="string value">"sajid1"</span>,
  <span class="string key">"name"</span>: <span class="string value">"Sajid Hasan"</span>,
  <span class="string key">"email"</span>: <span class="string value">"sajid1@id.com"</span>,
  <span class="string key">"password"</span>: <span class="string value">"$2b$10$G.vWTLfgzdjo1JjpiJMO2.bUKXL/KvsuygBAd1QvWUepuoXpr8QK6"</span>,
  <span class="string key">"createdAt"</span>: <span class="string value">"2022-06-21T06:08:44.000Z"</span>,
  <span class="string key">"updatedAt"</span>: <span class="string value">"2022-06-21T06:08:44.000Z"</span>
}`;

const plainText = `username            : sajid1
name                : Sajid Hasan
email               : sajid1@id.com
password            : $2b$10$G.vWTLfgzdjo1JjpiJMO2.bUKXL/KvsuygBAd1QvWUepuoXpr8QK6
createdAt           : 2022-06-21T06:08:44.000Z
updatedAt           : 2022-06-21T06:08:44.000Z
`;

describe('Testilng all functions of contentNegotiation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing sendResponse for xml', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/xml',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    const mStatus = 201;
    await contentNegotiation.sendResponse(mreq, mres, mUsers[0], mStatus);
    const data = mres.send()._getData();
    expect(data).toBe(xml);
    expect(mres.statusCode).toBe(mStatus);
    //console.log(mres._headers);
    //console.log('sajid', mres._getHeaders());
    //console.log('hasan', mres.send()._getHeaders());
    //const header = mres.send()._getHeaders();
    //expect(header['content-type']).toBe('application/xml');
  });
  test('Testing sendResponse for html', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'text/html',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    const mStatus = 201;
    await contentNegotiation.sendResponse(mreq, mres, mUsers[0], mStatus);
    const data = mres.send()._getData();
    expect(data).toBe(html);
    expect(mres.statusCode).toBe(mStatus);
  });
  test('Testing sendResponse for plain text', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'text/plain',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    await contentNegotiation.sendResponse(mreq, mres, mUsers[0]);
    const data = mres.send()._getData();
    expect(data).toBe(plainText);
    expect(mres.statusCode).toBe(200);
  });
  test('Testing sendResponse for json', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    await contentNegotiation.sendResponse(mreq, mres, mUsers[0]);
    const data = mres.send()._getData();
    expect(data).toEqual(jeson);
    expect(mres.statusCode).toBe(200);
  });
  test('Testing sendResponse for default', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'AnythingThatIsNotAvailable',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    await contentNegotiation.sendResponse(mreq, mres, mUsers[0]);
    const data = mres.send()._getData();
    expect(data).toEqual(jeson);
    expect(mres.statusCode).toBe(200);
  });
});
