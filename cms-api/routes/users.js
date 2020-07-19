var express = require('express');
var router = express.Router();
const Users = require('../models/Users')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const rahasia = 'tokenRahasia';

/* GET users listing. */
router.post('/register', function (req, res, next) {
  
});

module.exports = router;
