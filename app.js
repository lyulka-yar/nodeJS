const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routes/api.router');

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

let err = '';

/*STARTS ROUTES*/
app.use(apiRoutes);



// app.post('/users/:userId', async ({params}, res) => {
//   const {userId} = params;
//   const data = await readData(db);
//   let users = JSON.parse(data).filter(user => user.id !== Number(userId));
//
//   await writeData(db, users);
//
//   res.redirect('/users');
// });
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










