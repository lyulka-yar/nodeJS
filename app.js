const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');

const app = express();
const port = process.env.PORT || 5000;

//Templates Engine
// HBS config
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));

//Parsing middleware
app.use(express.urlencoded({extended: true}));
//Parsing application/json
app.use(express.json());
//Static files
app.use(express.static(path.join(__dirname, 'views')));

/* START Functions helpers, data, etc..*/

let err = '';
//ставил, ага
const db = path.join(__dirname, 'db', 'users.json');

const readData = async (arr) => {
  try {
	return await fs.readFile(path.join(arr),
	  'utf-8');
  } catch (e) {
	console.log(e);
  }
};
const writeData = async (file, item) => {
  try {
	await fs.writeFile(path.join(file),
	  `${JSON.stringify(item)}`, {encoding: 'utf-8'});
  } catch (e) {
	console.log('writing to DB was failed: ' + e);
  }
};

/*END Functions helpers, data, etc..*/

/*STARTS ROUTES*/
app.get('', (req, res) => {
  res.render('main');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async ({body}, res) => {
  const {email, age} = body;
  const data = await readData(db);
  const users = JSON.parse(data);

  const isExists = users.some(user => user.email === email);

  if (isExists) {
	err = `This ${email} already exists`;
	res.redirect(`/error`);
	return;
  }

  users.push({
	...body, id: users.length
	  ? users[users.length - 1].id + 1
	  : 1, age: Number(age)
  });

  await writeData(db, users);

  res.redirect('/users');
});

app.get('/signIn', (req, res) => {
  res.render('signIn');
});

app.post('/signIn', async (req, res) => {
  const {email, password} = req.body;
  const data = await readData(db);
  const users = JSON.parse(data);

  err = `User with ${email} not found`;

  let isExist = users.find(user =>
	user.email.toLowerCase() === email.toLowerCase()
	&& user.password === password);
  if (!!isExist) {
	res.redirect(`/users/${users[users.indexOf(isExist)].id}`);
	return;
  }
  res.render('error', {err});
});

app.get('/users', async (req, res) => {
  const data = await readData(db);
  const users = JSON.parse(data);

  res.render('users', {users});
});

app.get('/users/:userId', async (req, res) => {
  const {userId} = req.params;
  const data = await readData(db);
  const users = JSON.parse(data);

  const chosenUser = users.find(user => user.id === Number(userId));

  if (!!chosenUser) {
	res.render(`userInfo`, {chosenUser});
	return;
  }

  err = `User with id: ${userId} not found`;
  res.render('error', {err});
});

app.post('/users/:userId', async ({params}, res) => {

   const {userId} = params;
   const data = await readData(db);
   let users = JSON.parse(data).filter(user => user.id !== Number(userId));

   await writeData(db, users);

  res.redirect('/users');
});

/*Error pages*/

app.get('/error', (req, res) => {

  res.render('error', {err});
});

app.use((req, res) => {
  res.render('notFound');
});
/*ENDS ROUTES*/

/*Starting Server*/
app.listen(port, () => console.log(`Server was started at PORT: ${port}, http://localhost:${port}`));










