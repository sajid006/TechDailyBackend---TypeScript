const userController = require('../../controllers/userController');
const services = require('../../services/userServices');
const contentNegotiation = require('../../utils/contentNegotiation');
const { mockRequest, mockResponse } = require('mock-req-res');
const myUsers = [
    {
        username: 'hogs',
        name: 'mnxcz',
        email: 'dklfs@y.com',
        password: '$2b$10$dmF.CY9.muWjaTVCAgaFuupu/zaK2hpBv.ZcZFTY3nw6eQ91jq/FC',
        createdAt: '2022-06-17T03:21:57.000Z',
        updatedAt: '2022-06-17T03:25:27.000Z',
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

describe('Testilng all functions of userController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Testing getAllUsers', async () => {
        jest.spyOn(services, 'findAllUsers').mockImplementation(() => {
            return myUsers;
        });
        const req = mockRequest();
        const res = mockResponse();
        req.headers.accept = 'application/json';
        const next = jest.fn();
        jest.spyOn(contentNegotiation, 'sendResponse').mockImplementation((req, res, inputData, statuscode) => {
            console.log('lkdkljdflkjsfksf');
            res.setHeader('ContentType', req.headers.accept);
            if (!statuscode) statuscode = 200;
            res.statusCode = statuscode;
            return res.send(JSON.parse(JSON.stringify(inputData)));
        });
        await userController.getAllUsers(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res.format).toBe('hello');
    });
});
