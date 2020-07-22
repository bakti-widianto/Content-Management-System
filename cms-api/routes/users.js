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

        var token = jwt.sign({ email: email }, rahasia);
        let user = new Users({
          email: email,
          password: password,
          token: token
        })
        user.save()
          .then(data => {
            response.message = "register success"
            response.data.email = email
            response.token = token
            res.status(201).json(response)
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          })

      }
    }).catch(err => {
      res.status(500).json({
        error: true,
        message: 'error Users findOne'
      })
    })
});

//=========POST LOGIN=========
router.post('/login', function (req, res, next) {
  let { email, password } = req.body;
  let response = {
    message: "",
    data: {},
    token: ""
  }
  Users.findOne({ email })
    .then(data => {
      if (data == null) {
        response.message = "Email dosen't exist"
        res.status(200).json(response)
      } else {
        bcrypt.compare(password, data.password)
          .then(checkPassword => {
            if (checkPassword) {

              if (data.token) {
                response.message = "Authentication Success"
                response.data.email = data.email
                response.token = data.token
                res.status(201).json(response)

              } else {
                const newToken = jwt.sign({ email: data.email }, rahasia)
                Users.updateOne({ email: data.email }, { token: newToken })
                  .then(() => {
                    response.message = "Authentication Success"
                    response.data.email = data.email
                    response.token = newToken
                    res.status(201).json(response)
                  })
                  .catch(err => {
                    response.message = "Update Token Failed"
                    res.status(200).json(response)
                  })
              }

            } else {
              response.message = "Authentication Failed"
              res.status(200).json(response)
            }
          })
          .catch(err => {
            response.message = "Authentication failed";
            res.status(500).json(response);
          })
      }

    })
    .catch(err => {
      res.status(500).json(err)
    })
});

//======POST CHECK TOKEN====
router.post('/check', function (req, res, next) {
  let token = req.header('token')
  let response = {
    valid: false
  }
  // console.log(token)

  if (!token) {
    res.status(500).json(response)
  } else {
    const decode = jwt.verify(token, rahasia);
    // console.log(decode)
    Users.find({ email: decode.email })
      .then(result => {
        response.valid = true
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({ response })
      })
  }
});

//========DESTROY TOKEN=======
router.get('/logout', function (req, res, next) {
  let token = req.header('token')
  let response = {
    logout: false
  }

  if (!token) {
    res.status(500).json(response);
  } else {
    const decode = jwt.verify(token, rahasia)
    Users.findOneAndUpdate({ email: decode.email }, { token: "" }, { new: true })
      .then(result => {
        // console.log(result)
        response.logout = true
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json(response)
      })
  }


});




module.exports = router;
