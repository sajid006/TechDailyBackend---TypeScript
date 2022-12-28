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
const storyServices_1 = require("../services/storyServices");
const catchAsync_1 = require("../utils/catchAsync");
const contentNegotiation_1 = require("../utils/contentNegotiation");
const getAllStories = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allStories = yield storyServices_1.default.findAllStories();
    (0, contentNegotiation_1.default)(req, res, allStories);
}));
const getUserStories = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userStories = yield storyServices_1.default.findUserStories(id);
    (0, contentNegotiation_1.default)(req, res, userStories);
}));
const getSearchedStories = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userStories = yield storyServices_1.default.findSearchedStories(id);
    (0, contentNegotiation_1.default)(req, res, userStories);
}));
const getStory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id * 1;
    const myStory = yield storyServices_1.default.findOneStory(id);
    (0, contentNegotiation_1.default)(req, res, myStory);
}));
const postStory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storyData = {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
    };
    const newStory = yield storyServices_1.default.createStory(storyData);
    (0, contentNegotiation_1.default)(req, res, newStory, 201);
}));
const patchStory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const id = req.params.id;
    const description = req.body.description;
    const myStory = yield storyServices_1.default.updateStory(id, title, description);
    (0, contentNegotiation_1.default)(req, res, myStory);
}));
const deleteStory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield storyServices_1.default.removeStory(id);
    res.status(204).json({});
}));
const storyController = {
    getAllStories,
    getUserStories,
    getSearchedStories,
    getStory,
    postStory,
    patchStory,
    deleteStory,
};
exports.default = storyController;
