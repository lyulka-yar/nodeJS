const users = require('../db/users');

class SignInController {

  renderSignInPage(req, res) {
	res.render('signIn');
  };

  signInIfExists({ body }, res) {
	const { email, password } = body;

	let isExist = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

	if ( !!isExist ) {
	  res.redirect(`/users/${ users[users.indexOf(isExist)].id }`);
	  return;
	}

	res.redirect('/error');
  }
}

module.exports = new SignInController();
