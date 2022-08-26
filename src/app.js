const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// Setting

app.set('port', 5000); //Puerto aplicacion
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routers
app.use(require('./routes/index.js'));

// Static (Public)
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('404 not found');
} )


module.exports = app;