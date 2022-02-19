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










