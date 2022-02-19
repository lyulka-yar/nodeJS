const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');

const app = express();
const port = process.env.PORT || 5000;

//Templates Engine
// HBS config
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}))

//Parsing middleware
app.use(express.urlencoded({extended: false}));

//Parsing application/json
app.use(express.json());

//Static files
app.use(express.static(path.join(__dirname, 'views')));


let users = [];
let error = {
  existEmail: 'User with this email already exists',
  notFound: 'not found'
};

const db = path.join(__dirname, 'db', 'users.json');

const readData = async (arr) => {
  try {
	return await fs.readFile(path.join(arr),
	  'utf-8');
  } catch (e) {
	console.log(e);
  }
}

const writeData = async (file, item) => {
  try {
	await fs.writeFile(path.join(file),
	  `${JSON.stringify(item)}`, {encoding: 'utf-8'});
  } catch (e) {
	console.log('writing to DB was failed: ' + e);
  }
}

readData(db).then((data) => {
  users = JSON.parse(data);
});

app.get('', (req, res) => {
  res.render('main');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', ({body}, res) => {
  const isUser = users.some(user => {
	if(user.email === body.email) {
	  console.log(user.email);
	  console.log(body.email);
	}
  });
  if (!isUser) {
	console.log()
	res.redirect('/error');
  }
  users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
  writeData(db, users);

  res.redirect('/users');
});

app.get('/users', (req, res) => {
  res.render('users', {users});
});

app.get('/logout', (req, res) => {
  res.redirect('');
});

app.get('/users/:userId', (req, res) => {
  const {userId} = req.params;

  const chosenUser = users.find(user => user.id === +userId);
  // console.log(chosenUser);
  if (!chosenUser) {
	const err = `User with id: ${userId} ${error.notFound}`;

	res.render('error', {err});
	return;
  }
  res.render('userInfo', {chosenUser});
});

app.get('/users/filter', (req, res) => {
  res.render('filter');
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.use((req, res) => {
  res.render('notFound')
});

app.listen(port, () => console.log(`Server was started at PORT: ${port}, http://localhost:${port}`));










