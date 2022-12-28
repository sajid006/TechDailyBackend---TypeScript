const storyModel = require('../models/storyModel');
const stories = storyModel.stories;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validateID = async (value: any) => {
  const validstory = await stories.findAll({
    where: {
      id: value,
    },
  });
  if (validstory.length > 0) return 1;
  else return 0;
};

const findAllStories = async () => {
  const storiesList = await stories.findAll();
  return storiesList;
};

const findUserStories = async (id: any) => {
  const storyList = await stories.findAll({
    where: {
      username: id,
    },
  });
  return storyList;
};

const findSearchedStories = async (id: any) => {
  const storyList = await stories.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: '%' + id + '%',
          },
        },
        {
          title: {
            [Op.like]: '%' + id + '%',
          },
        },
      ],
    },
  });
  return storyList;
};

const findOneStory = async (id: any) => {
  const story = await stories.findAll({
    where: {
      id,
    },
  });
  return story[0];
};

const createStory = async (storyData: any) => {
  const { username, title, description, rating } = storyData;
  const newStory = await stories.create({ username, title, description, rating });
  return newStory;
};

const updateStory = async (id: any, title: any, description: any) => {
  console.log(typeof id);
  console.log(typeof title);
  console.log(typeof description);
  const myStory = await stories.update(
    {
      title,
      description,
    },
    {
      where: {
        id,
      },
    }
  );
  return myStory;
};

const removeStory = async (id: any) => {
  const deleted = stories.destroy({
    where: {
      id,
    },
  });
  return deleted;
};

const storyServices = {
  validateID,
  findAllStories,
  findUserStories,
  findSearchedStories,
  findOneStory,
  createStory,
  updateStory,
  removeStory,
};
export default storyServices;
// $or: [
//   {
//     username: {
//       [Op.like]: '%' + id + '%',
//     },
//   },
//   {
//     title: {
//       [Op.like]: '%' + id + '%',
//     },
//   },
// ],
