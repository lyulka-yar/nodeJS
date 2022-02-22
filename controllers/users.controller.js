let users = require('../db/users');

class UserController {
  renderUsers({ query }, res, next) {
	const { age, city } = query;

	try {
	  let filtered = users;
	  if ( age || city ) {

		if ( age && city === '' ) {
		  filtered = users.filter(user => user.age === Number(age));
		}

		if ( city && age === '' ) {
		  filtered = users.filter(user => user.city.toLowerCase() === city.toLowerCase());
		}

		if ( age && city ) {
		  filtered = users.filter(user => user.age === Number(age) && user.city.toLowerCase() === city.toLowerCase());
		}

		res.render('users', { users: filtered });
	  }

	  res.render('users', { users });
	} catch (message) {
	  res.redirect(`/error?error=${ message }`);
	}
  };

  getUserById({ params }, res, next) {

	const { userId } = params;
	try {

	  const chosenUser = users.find(user => user.id === Number(userId));

	  if ( !!chosenUser ) {
		res.render(`userInfo`, { chosenUser });
	  }
	} catch (e) {
	  console.log(e);
	  res.redirect(`/error`);
	}
  };

  deleteUserById({ params }, res) {
	const { userId } = params;

	users = users.filter(user => user.id !== Number(userId));

	res.redirect('/users');
  }
}

module.exports = new UserController();
