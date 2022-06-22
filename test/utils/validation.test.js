const validation = require('../../utils/validation');
const httpMocks = require('node-mocks-http');
const userModel = require('../../models/userModel');
const users = userModel.users;
const jwt = require('jsonwebtoken');
const myUsers = [
  {
    username: 'sajid1',
    name: 'Sajid Hasan',
    email: 'sajid1@id.com',
    password: '$2b$10$G.vWTLfgzdjo1JjpiJMO2.bUKXL/KvsuygBAd1QvWUepuoXpr8QK6',
    createdAt: '2022-06-21T06:08:44.000Z',
    updatedAt: '2022-06-21T06:08:44.000Z',
  },
  {
    username: 'sajid',
    name: 'Sajid Hasan',
    email: 'fwxxcai@d.com',
    password: '$2b$10$QjvZDwwRlqutEUeuuhdq1eGS/5mTBnjwdsXj2xbSKJ2XmpzccDR7y',
    createdAt: '2022-06-17T05:18:39.000Z',
    updatedAt: '2022-06-17T05:18:39.000Z',
  },
];
describe('Testilng all functions of validation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing generateToken', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation((object1) => {
      return object1.username;
    });
    const token = await validation.generateToken(myUsers[0].username);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        username: myUsers[0].username,
      },
      undefined,
      {
        expiresIn: undefined,
      }
    );
    expect(token).toBe(myUsers[0].username);
  });
  test('Testing checkTokenUser', async () => {
    jest.spyOn(validation, 'decodeToken').mockImplementation((req, res) => {
      console.log('please');
      return req.username;
    });
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      username: myUsers[0].username,
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await validation.checkTokenUser(mreq, mres, mnext);
    //expect(validation.decodeToken).toHaveBeenCalledTimes(1);
    expect(validation.decodeToken).toHaveBeenCalledWith(mreq, mres);
  });
});
