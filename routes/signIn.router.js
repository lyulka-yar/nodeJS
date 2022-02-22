const { Router } = require('express');

const signInRoutes = Router();

const SignInController = require('../controllers/signIn.controller');

signInRoutes.get('/', SignInController.renderSignInPage);

signInRoutes.post('/', SignInController.signInIfExists);

module.exports = signInRoutes;
