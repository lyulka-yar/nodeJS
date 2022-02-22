const users = require('../db/users');

function isUserDataValid({ body }, res, next) {
  try {
	const { firstName, lastName, email, password, age, city } = body;

	if ( !email || !password ) {
	  throw new Error('email or password is not provided');
	}

	if ( !email.includes('@') && !email.includes('.') ) {
	  throw new Error('not a valid email address');
	}

	if ( password.length < 8 ) {
	  throw new Error('password is not valid');
	}

	if ( firstName.length < 2 && lastName.length < 2 ) {
	  throw new Error('Name and Surname length must be at least 2 characters');
	}

	if ( Number(age) < 18 ) {
	  throw new Error('not a valid age, min 18 years');
	}

	if ( !city ) {
	  throw new Error('not a valid city');
	}

	next();
  } catch (err) {
	res.redirect(`/error?error=${ err.message }`);
  }
}

function isUserExist({ body }, res) {
  try {
	const { email } = body;
	const isExist = users.find(user => user.email === email);

	if ( isExist ) throw new Error(`User with this email ${ email } already exists`);

  } catch (err) {
	res.redirect(`/error?error=${ err.message }`);
  }
}

function isIdExists(req, res, next) {
  try {
	const { userId } = req.params;

	if ( !Number.isInteger(+userId) || Number.isNaN(+userId) ) {

	  throw new Error(`ID: ${ userId } is not valid`);
	}

	const user = users.find(user => user.id === Number(user.id));

	if ( !user ) throw new Error(`User with ID: ${ userId } exists!`);

	next();
  } catch (err) {
	res.redirect(`/error?error=${ err.message }`);
  }
}

module.exports = { isUserDataValid, isIdExists, isUserExist };
