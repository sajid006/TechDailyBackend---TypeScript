const storyModel = require('../models/storyModel');
const stories = storyModel.stories;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.validateID = async (value) => {
  const validstory = await stories.findAll({
    where: {
      id: value,
    },
  });
  if (validstory.length > 0) return 1;
  else return 0;
};

exports.findAllStories = async () => {
  const storiesList = await stories.findAll();
  return storiesList;
};

exports.findUserStories = async (id) => {
  const storyList = await stories.findAll({
    where: {
      username: id,
    },
  });
  return storyList;
};

exports.findSearchedStories = async (id) => {
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

exports.findOneStory = async (id) => {
  const story = await stories.findAll({
    where: {
      id,
    },
  });
  return story[0];
};

exports.createStory = async (storyData) => {
  const { username, title, description, rating } = storyData;
  const newStory = await stories.create({ username, title, description, rating });
  return newStory;
};

exports.updateStory = async (id, title, description) => {
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

exports.removeStory = async (id) => {
  const deleted = stories.destroy({
    where: {
      id,
    },
  });
  return deleted;
};

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
