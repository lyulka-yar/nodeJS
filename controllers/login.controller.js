let users = require('../db/users');

class LoginController {
  renderLoginPage(req, res) {
	res.render('login');
  };

  loginByEmail({ body }, res) {
	try {
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

	  res.redirect('/users');
	} catch (err) {
	  res.redirect(`/error?error=${ err.message }`);
	}
  }
}

module.exports = new LoginController();
