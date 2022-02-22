const { Router } = require('express');

const loginRoutes = Router();

const LoginController = require('../controllers/login.controller');

loginRoutes.get('/', LoginController.renderLoginPage);

loginRoutes.post('/', LoginController.loginByEmail);

module.exports = loginRoutes;
