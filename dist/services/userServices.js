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
const userModel_1 = require("../models/userModel");
const validateUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(username);
    const validUsers = yield userModel_1.default.findAll({
        where: {
            username,
        },
    });
    console.log(validUsers);
    if (validUsers.length > 0)
        return 1;
    else
        return 0;
});
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersList = yield userModel_1.default.findAll();
    return usersList;
});
const findOneUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findAll({
        where: {
            username: username,
        },
    });
    return user[0];
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, email, password } = userData;
    const newUser = yield userModel_1.default.create({ username, name, email, password });
    return newUser;
});
const updateUser = (username, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = yield userModel_1.default.update({ email, name }, {
        where: {
            username,
        },
    });
    return myUser;
});
const removeUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = userModel_1.default.destroy({
        where: {
            username,
        },
    });
    return deleted;
});
const userServices = { validateUser, findAllUsers, findOneUser, createUser, updateUser, removeUser };
exports.default = userServices;
