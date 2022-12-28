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
const userServices_1 = require("../services/userServices");
const catchAsync_1 = require("../utils/catchAsync");
const checkUsername = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.params.id;
    const noOfUser = yield userServices_1.default.validateUser(value);
    if (noOfUser < 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }
    next();
}));
const checkUpdateBody = (req, res, next) => {
    if (!req.body.email || !req.body.name) {
        return res.status(400).json({
            status: 'fail',
            message: 'name or email missing',
        });
    }
    next();
};
const checkPostBody = (req, res, next) => {
    if (!req.body.username) {
        return res.status(400).json({
            status: 'fail',
            message: 'Username missing',
        });
    }
    if (!req.body.name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Name missing',
        });
    }
    if (!req.body.email) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email missing',
        });
    }
    if (!req.body.password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Password missing',
        });
    }
    if (req.body.password.length < 8) {
        return res.status(400).json({
            status: 'fail',
            message: 'Password length must be at least 8',
        });
    }
    next();
};
const userAuthMiddleware = {
    checkPostBody,
    checkUpdateBody,
    checkUsername,
};
exports.default = userAuthMiddleware;
