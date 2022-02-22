const users = require('../db/users');

class LoginController {
  renderLoginPage(req, res) {
	res.render('login');
  };

  loginByEmail({ body }, res) {
	const { email, age } = body;

	const isExists = users.some(user => user.email === email);

	if ( isExists ) {
	  res.redirect(`/error`);
	}

	users.push({
	  ...body, id: users.length
		? users[users.length - 1].id + 1
		: 1, age: Number(age)
	});
	console.log(users);

	res.redirect('/users');
  }
}

module.exports = new LoginController();
