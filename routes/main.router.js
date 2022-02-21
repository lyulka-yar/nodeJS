const {Router} = require('express');

const mainRoutes = Router();

mainRoutes.get('', (req, res) => {
  res.render('main');
});

module.exports = mainRoutes;
