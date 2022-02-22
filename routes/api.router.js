const { Router } = require('express');
const usersRoutes = require('./users.router');
const loginRoutes = require('./login.router');
const mainRoutes = require('./main.router');
const signInRoutes = require('./signIn.router');

const routes = Router();

routes.use('/', mainRoutes);
routes.use('/users', usersRoutes);
routes.use('/login', loginRoutes);
routes.use('/signIn', signInRoutes);

routes.get('/error', ({ query }, res) => {
  const { error } = query;
  res.render('error', { error });
});

routes.use((req, res) => {
  res.render('notFound');
});
module.exports = routes;
