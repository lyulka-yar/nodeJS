const {Router} = require('express');

const usersRoutes = Router();

const users = require('../db/users.json');

usersRoutes.get('/', (req, res) => {
  res.render('users', {users});
});

usersRoutes.get('/:userId', ({params}, res) => {
  const {userId} = params;

  const chosenUser = users.find(user => user.id === Number(userId));

  if (!!chosenUser) {
	res.render(`userInfo`, {chosenUser});
	return;
  }

  const err = `User with id: ${userId} not found`;
  // res.render('error', {err});
});


// usersRoutes.post('/:userId', ({params}, res) => {
//   const {userId} = params;
//
//   users.filter(user => user.id !== Number(userId));
//
//   res.redirect('/users');
// });

module.exports = usersRoutes;
