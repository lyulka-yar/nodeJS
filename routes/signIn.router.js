const {Router} = require('express');

const signInRoutes = Router();

const users = require('../db/users.json');

signInRoutes.get('/', (req, res) => {
  res.render('signIn');
});

signInRoutes.post('/', async (req, res) => {
  const {email, password} = req.body;

  // const err = `User with ${email} ${error.notFound}`;

  let isExist = users.find(user =>
	user.email.toLowerCase() === email.toLowerCase()
	&& user.password === password);

  if (!!isExist) {
	res.redirect(`/users/${users[users.indexOf(isExist)].id}`);
	return;
  }
  // res.render('error', {err})
  res.render('error');
});

module.exports = signInRoutes;
