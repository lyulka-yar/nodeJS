const { Router } = require('express');

const signInMiddleware = require('../middlewares/signInValidation');

const signInRoutes = Router();

const SignInController = require('../controllers/signIn.controller');

signInRoutes.get('/', SignInController.renderSignInPage);

signInRoutes.post('/',
  signInMiddleware.checkUserCredentials,
  SignInController.signInIfExists);

module.exports = signInRoutes;
