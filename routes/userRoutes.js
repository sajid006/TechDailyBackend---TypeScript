const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../utils/validation');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userAuthMiddleware.checkBody, userController.postUser);

router
    .route('/:id')
    .get(userAuthMiddleware.checkUsername, userController.getUser)
    .patch(
        validation.checkTokenUser,
        userAuthMiddleware.checkUsername,
        userAuthMiddleware.checkBody,
        userController.patchUser
    )
    .delete(validation.checkTokenUser, userAuthMiddleware.checkUsername, userController.deleteUser);

router.route('/login').post(validation.validatetUser);

module.exports = router;
