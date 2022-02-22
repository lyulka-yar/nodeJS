const { Router } = require('express');

const usersRoutes = Router();

const UserController = require('../controllers/users.controller');

usersRoutes.get('/', UserController.renderUsers);

usersRoutes.get('/:userId', UserController.getUserById);

usersRoutes.post('/:userId', UserController.deleteUserById);

module.exports = usersRoutes;
