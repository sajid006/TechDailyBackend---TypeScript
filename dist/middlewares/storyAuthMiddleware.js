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
const checkID = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.params.id;
    const noOfStory = yield storyServices_1.default.validateID(value);
    if (noOfStory < 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }
    next();
}));
const checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            status: 'fail',
            message: 'Title or description missing',
        });
    }
    next();
};
const storyAuthMiddleware = { checkID, checkBody };
exports.default = storyAuthMiddleware;
