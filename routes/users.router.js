const { Router } = require('express');
const UserController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/userValidation');

const usersRoutes = Router();

usersRoutes.get('/', UserController.renderUsers);

usersRoutes.get('/:userId',
  userMiddleware.isIdExists,
  UserController.getUserById);

usersRoutes.post('/:userId',
  userMiddleware.isIdExists,
  UserController.deleteUserById);

module.exports = usersRoutes;
