const {Router} = require('express');

const routes = Router();

const usersRoutes = require('./users.router');
const loginRoutes = require('./login.router');
const mainRoutes = require('./main.router');
const signInRoutes = require('./signIn.router');

routes.use('/', mainRoutes);
routes.use('/users', usersRoutes);
routes.use('/login', loginRoutes);
routes.use('/signIn', signInRoutes);

module.exports = routes;
