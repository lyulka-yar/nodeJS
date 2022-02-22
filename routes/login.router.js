const { Router } = require('express');
const userMiddleware = require('../middlewares/userValidation');
const LoginController = require('../controllers/login.controller');

const loginRoutes = Router();

loginRoutes.get('/', LoginController.renderLoginPage);

loginRoutes.post('/',
  userMiddleware.isUserDataValid,
  userMiddleware.isUserExist,
  LoginController.loginByEmail);

module.exports = loginRoutes;
