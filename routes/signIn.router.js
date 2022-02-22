const { Router } = require('express');
const SignInController = require('../controllers/signIn.controller');
const signInMiddleware = require('../middlewares/signInValidation');

const signInRoutes = Router();

signInRoutes.get('/', SignInController.renderSignInPage);

signInRoutes.post('/',
  signInMiddleware.checkUserCredentials,
  SignInController.signInIfExists);

module.exports = signInRoutes;
