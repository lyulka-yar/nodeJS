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
app.use(express.urlencoded({extended: true}));
//Parsing application/json
app.use(express.json());
//Static files
app.use(express.static(path.join(__dirname, 'views')));

/* START Functions helpers, data, etc..*/
let users = [];
let error = {
  existEmail: 'User with this email:',
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
/*END Functions helpers, data, etc..*/

/*STARTS ROUTES*/
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signIn', (req, res) => {
  res.render('signIn');
});

app.post('/signIn', (req, res) => {
  const {email, password, userId} = req.params;
  const usersArr = [...users];
  const err = `User with ${email} and ${password} ${error.notFound}`;
  let isExist = usersArr.find(user =>
	user.email.toLowerCase() === email.toLowerCase()
	&& user.password === password)

  if (isExist) {
	res.redirect(`/users/${isExist.id}`);
  }
  res.render('error', {err})
});

app.get('/users', (req, res) => {
  res.render('users', {users});
});

app.get('/users/:userId', (req, res) => {
  const {userId} = req.params;

  const chosenUser = users.find(user => user.id === +userId);

  res.render(`userInfo`, {chosenUser});
});


/*Error pages*/

app.get('/error', (req, res) => {
  res.render('error');
});

app.use((req, res) => {
  res.render('notFound')
});
/*ENDS ROUTES*/

/*Starting Server*/
app.listen(port, () => console.log(`Server was started at PORT: ${port}, http://localhost:${port}`));










