let users = require('../db/users');

class UserController {
  renderUsers({ query }, res) {
	const { age, city } = query;

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
  };

  getUserById({ params  }, res) {

	try {
	  const { userId } = params;

	  const chosenUser = users.find(user => user.id === Number(userId));

	  if ( !!chosenUser ) {
		res.render(`userInfo`, { chosenUser });
	  } else {
		throw new Error(`User with ID: ${ userId } not found`);
	  }

	} catch (err) {
	  res.redirect(`/error?error=${ err.message }`);
	}

  }

  deleteUserById({ params }, res) {
	const { userId } = params;

	users = users.filter(user => user.id !== Number(userId));

	res.redirect('/users');
  }
}

module.exports = new UserController();
