const {Router} = require('express');

const loginRoutes = Router();

const users = require('../db/users.json');

loginRoutes.get('/', (req, res) => {
  res.render('login');
});

loginRoutes.post('/', ({body}, res) => {
  const {email, age} = body;
  // const err = `${error.existEmail} ${email} already exists`;

  const isExists = users.some(user => user.email === email);

  if (isExists) {
	res.redirect('/error');
	return;
  }

  users.push({
	...body, id: users.length
	  ? users[users.length - 1].id + 1
	  : 1, age: Number(age)
  });

  res.redirect('/users');
});

module.exports = loginRoutes;
