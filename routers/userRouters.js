const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.checkBody, userController.postUser);

router
  .route('/:id')
  .get(userController.checkID, userController.getOneUser)
  .patch(
    userController.checkID,
    userController.checkBody,
    userController.patchUser
  )
  .delete(userController.checkID, userController.deleteUser);

router
  .route('/login')
  .post(userController.checkBody, userController.validatetUser);

module.exports = router;
