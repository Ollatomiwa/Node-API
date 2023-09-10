const express = require('express');
const userController = require ('./../controllers/userController'); //either this or the one below
//const {gerAllUsers, createUser, getUserId, updateUser, deleteUser} = require ('./../controllers/userController');



const userRouter = express.Router();

userRouter.route ('/').get(userController.getAllUsers).post(userController.createUser);
userRouter.route (`/:id`).get(userController.getUserId).post(userController.updateUser).delete(userController.deleteUser);

module.exports = userRouter;