// Entry point for server JavaScript

// Creating an app
const express = require('express');
const app = express();

// Logging middleware (helps with debugging, options: morgan, express-logger, volleyball)
const morgan = require('morgan');
app.use(morgan('dev'));

// Static middleware (to request static assets from your server - these include javascript files, css files, and images)
const path = require('path')
app.use(express.static(path.join(__dirname, '../public')));

// Parsing middleware (Requests frequently contain a body - if you want to use it in req.body, then you'll need some middleware to parse the body, can also use express as body parser)
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Mount all API routes onto /api
app.use('/api', require('./api'))

// Make server send its index.html for any request that don't match any of the defined API routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html'));
}) // REPLACE ./path/to/index.html

// Hanlde 500 Errors (placement matters, important to put at the end of server file)
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error')
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Knock knock");
  console.log("Who's there");
  console.log(`Your server, listening on port ${port}`);
})

module.exports = app