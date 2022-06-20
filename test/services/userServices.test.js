//const { mockRequest, mockResponse } = require('mock-req-res');
//const mockNext = jest.fn();
const userModel = require('../../models/userModel');
const users = userModel.users;
const userServices = require('../../services/userServices');

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
describe('Testilng all functions of userService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Testing validateUser', async () => {
        jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
        const valid = await userServices.validateUser(myUsers[0].username);
        expect(users.findOne).toHaveBeenCalledTimes(1);
        expect(users.findOne).toHaveBeenCalledWith({
            where: {
                username: myUsers[0].username,
            },
        });
        expect(valid).toEqual(1);
    });
    test('Testing findAllUsers', async () => {
        jest.spyOn(users, 'findAll').mockReturnValue(myUsers);
        const usersList = await userServices.findAllUsers();
        expect(users.findAll).toHaveBeenCalledTimes(1);
        expect(usersList).toBe(myUsers);
    });
    test('Testing findOneUser', async () => {
        jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
        const user = await userServices.findOneUser(myUsers[0].username);
        expect(users.findOne).toHaveBeenCalledTimes(1);
        expect(users.findOne).toHaveBeenCalledWith({
            where: {
                username: myUsers[0].username,
            },
        });
        expect(user).toBe(myUsers[0]);
    });
    test('Testing createUser', async () => {
        jest.spyOn(users, 'create').mockImplementation((yoyo) => {
            return yoyo;
        });
        const user = await userServices.createUser(myUsers[0]);
        const { username, name, email, password } = myUsers[0];
        expect(users.create).toHaveBeenCalledTimes(1);
        expect(users.create).toHaveBeenCalledWith({ username, name, email, password });
        expect(user).toEqual({ username, name, email, password });
    });
    test('Testing updateUser', async () => {
        jest.spyOn(users, 'update').mockReturnValue(1);
        const updated = await userServices.updateUser(myUsers[0].username, myUsers[0].name, myUsers[0].email);
        expect(users.update).toHaveBeenCalledTimes(1);
        expect(users.update).toHaveBeenCalledWith(
            { email: myUsers[0].email, name: myUsers[0].name },
            { where: { username: myUsers[0].username } }
        );
        expect(updated).toBe(1);
    });
    test('Testing removeUser', async () => {
        jest.spyOn(users, 'destroy').mockReturnValue(1);
        const deleted = await userServices.removeUser(myUsers[0].username);
        expect(users.destroy).toHaveBeenCalledTimes(1);
        expect(users.destroy).toHaveBeenCalledWith({ where: { username: myUsers[0].username } });
        expect(deleted).toBe(1);
    });
});
