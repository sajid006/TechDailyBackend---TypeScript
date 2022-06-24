//const { mockRequest, mockResponse } = require('mock-req-res');
//const mockNext = jest.fn();
const userModel = require('../../models/userModel');
const users = userModel.users;
const userServices = require('../../services/userServices');
const mUsers = require('../mockData/mUsers');
describe('Testilng all functions of userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing validateUser for 1', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(mUsers[0]);
    const valid = await userServices.validateUser(mUsers[0].username);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: {
        username: mUsers[0].username,
      },
    });
    expect(valid).toEqual(1);
  });
  test('Testing validateUser for 0', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue();
    const valid = await userServices.validateUser(mUsers[0].username);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: {
        username: mUsers[0].username,
      },
    });
    expect(valid).toEqual(0);
  });
  test('Testing findAllUsers', async () => {
    jest.spyOn(users, 'findAll').mockReturnValue(mUsers);
    const usersList = await userServices.findAllUsers();
    expect(users.findAll).toHaveBeenCalledTimes(1);
    expect(usersList).toBe(mUsers);
  });
  test('Testing findOneUser', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(mUsers[0]);
    const user = await userServices.findOneUser(mUsers[0].username);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: {
        username: mUsers[0].username,
      },
    });
    expect(user).toBe(mUsers[0]);
  });
  test('Testing createUser', async () => {
    jest.spyOn(users, 'create').mockImplementation((inputData) => {
      return inputData;
    });
    const user = await userServices.createUser(mUsers[0]);
    const { username, name, email, password } = mUsers[0];
    expect(users.create).toHaveBeenCalledTimes(1);
    expect(users.create).toHaveBeenCalledWith({ username, name, email, password });
    expect(user).toEqual({ username, name, email, password });
  });
  test('Testing updateUser', async () => {
    jest.spyOn(users, 'update').mockReturnValue(1);
    const updated = await userServices.updateUser(mUsers[0].username, mUsers[0].name, mUsers[0].email);
    expect(users.update).toHaveBeenCalledTimes(1);
    expect(users.update).toHaveBeenCalledWith(
      { email: mUsers[0].email, name: mUsers[0].name },
      { where: { username: mUsers[0].username } }
    );
    expect(updated).toBe(1);
  });
  test('Testing removeUser', async () => {
    jest.spyOn(users, 'destroy').mockReturnValue(1);
    const deleted = await userServices.removeUser(mUsers[0].username);
    expect(users.destroy).toHaveBeenCalledTimes(1);
    expect(users.destroy).toHaveBeenCalledWith({ where: { username: mUsers[0].username } });
    expect(deleted).toBe(1);
  });
});
