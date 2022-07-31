"use strict"
const router = require("express").Router();

// Further delegate each route into its own namespace
router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
  // For demo purposes only:
// router.use('/users', require('./users')); // matches all requests to /api/users/
// router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

// Error handling for unfound route
router.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

module.exports = router;