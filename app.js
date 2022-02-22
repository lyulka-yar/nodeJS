const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const apiRoutes = require('./routes/api.router');

const app = express();
const port = process.env.PORT || 5000;

/*Set engine*/
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));

/*Set config*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

/*Set routes*/
app.use(apiRoutes);

/*Starting Server*/
app.listen(port, () => console.log(`Server was started at PORT: ${ port }, http://localhost:${ port }`));










