const users = require('../db/users');

function checkUserCredentials(req, res, next) {
  try {
	const { email, password } = req.body;
	const user = users.find(user => user.email === email && user.password === password);

	if ( !user ) throw new Error('Wrong email or password');

	next();
  } catch (err) {
	res.redirect(`/error?error=${ err.message }`);
  }
}

module.exports = { checkUserCredentials };
