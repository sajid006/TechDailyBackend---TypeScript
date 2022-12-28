import users from '../models/userModel';

const validateUser = async (username: any) => {
  console.log(username);
  const validUsers = await users.findAll({
    where: {
      username,
    },
  });
  console.log(validUsers);
  if (validUsers.length > 0) return 1;
  else return 0;
};

const findAllUsers = async () => {
  const usersList = await users.findAll();
  return usersList;
};

const findOneUser = async (username: any) => {
  const user = await users.findAll({
    where: {
      username: username,
    },
  });

  return user[0];
};

const createUser = async (userData: any) => {
  const { username, name, email, password } = userData;
  const newUser = await users.create({ username, name, email, password });
  return newUser;
};

const updateUser = async (username: any, name: any, email: any) => {
  const myUser = await users.update(
    { email, name },
    {
      where: {
        username,
      },
    }
  );
  return myUser;
};

const removeUser = async (username: any) => {
  const deleted = users.destroy({
    where: {
      username,
    },
  });
  return deleted;
};

const userServices = { validateUser, findAllUsers, findOneUser, createUser, updateUser, removeUser };
export default userServices;
