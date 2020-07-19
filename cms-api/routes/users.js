var express = require('express');
var router = express.Router();
const Users = require('../models/Users')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const rahasia = 'tokenRahasia';


//=========POST REGISTER=======
router.post('/register', function (req, res, next) {
  let { email, password, retypepassword } = req.body;
  let response = {
    message: "",
    data: {},
    token: ""
  }

  if (password != retypepassword) return res.status(500).json({
    error: true,
    message: "password doesn't match"
  })
  Users.findOne({ email })
    .then(result => {
      if (result) {
        response.message = 'Email already exist';
        return res.status(200).json(response)

      } else {
        bcrypt.hash(password, saltRounds).then(function (hash) {
          var token = jwt.sign({ email: email }, rahasia);
          let user = new Users({
            email: email,
            password: hash,
            token: token
          })
          user.save()
            .then(data => {
              response.message = "register success"
              response.data.email = email
              response.token = token
              res.status(201).json({ response })
            })
            .catch(err => {
              res.status(500).json({
                error: err
              })
            })
        });
      }
    }).catch(err => {
      res.status(500).json({
        error: true,
        message: 'error Users findOne'
      })
    })
});





module.exports = router;
