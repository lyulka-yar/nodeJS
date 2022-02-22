const { Router } = require('express');

const userMiddleware = require('../middlewares/userValidation');

const loginRoutes = Router();

const LoginController = require('../controllers/login.controller');

loginRoutes.get('/', LoginController.renderLoginPage);

loginRoutes.post('/',
  userMiddleware.isUserDataValid,
  LoginController.loginByEmail);

module.exports = loginRoutes;
