"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const storyModel = require('../models/storyModel');
const stories = storyModel.stories;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validateID = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const validstory = yield stories.findAll({
        where: {
            id: value,
        },
    });
    if (validstory.length > 0)
        return 1;
    else
        return 0;
});
const findAllStories = () => __awaiter(void 0, void 0, void 0, function* () {
    const storiesList = yield stories.findAll();
    return storiesList;
});
const findUserStories = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const storyList = yield stories.findAll({
        where: {
            username: id,
        },
    });
    return storyList;
});
const findSearchedStories = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const storyList = yield stories.findAll({
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
});
const findOneStory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const story = yield stories.findAll({
        where: {
            id,
        },
    });
    return story[0];
});
const createStory = (storyData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, title, description, rating } = storyData;
    const newStory = yield stories.create({ username, title, description, rating });
    return newStory;
});
const updateStory = (id, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(typeof id);
    console.log(typeof title);
    console.log(typeof description);
    const myStory = yield stories.update({
        title,
        description,
    }, {
        where: {
            id,
        },
    });
    return myStory;
});
const removeStory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = stories.destroy({
        where: {
            id,
        },
    });
    return deleted;
});
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
exports.default = storyServices;
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
