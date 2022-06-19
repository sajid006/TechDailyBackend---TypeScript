//const { mockRequest, mockResponse } = require('mock-req-res');
//const mockNext = jest.fn();
const userModel = require('../../models/userModel');
const users = userModel.users;
const userServices = require('../../services/userServices');

const mydata = [
    {
        username: 'hog',
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
describe.only('Testilng all functions of userService', () => {
    test('Testing validateUser', async () => {
        jest.spyOn(users, 'findOne').mockImplementation(() => {
            return mydata[0];
        });
        const valid = await userServices.validateUser(mydata[0]);
        expect(valid).toEqual(1);
    });
});
