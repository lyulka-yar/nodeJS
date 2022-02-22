const { Router } = require('express');

const routes = Router();

const usersRoutes = require('./users.router');
const loginRoutes = require('./login.router');
const mainRoutes = require('./main.router');
const signInRoutes = require('./signIn.router');

routes.use('/', mainRoutes);
routes.use('/users', usersRoutes);
routes.use('/login', loginRoutes);
routes.use('/signIn', signInRoutes);

routes.use((req, res) => {
  res.render('notFound');
});
routes.get('/error', ({ query }, res) => {
  const { error } = query;
  res.render('error', { query: { error } });
});

module.exports = routes;
