var express = require('express');
var router = express.Router();
const Data = require('../models/Data');
const e = require('express');

//====BROWSE====
router.post('/search', function (req, res, next) {
    let { letter, frequency } = req.body
    let reg = new RegExp(letter, 'i');
    let response = []
    let filter = {}

    if (letter && frequency) {
        filter.letter = { $regex: reg };
        filter.frequency = frequency;
    } else if (letter) {
        filter.letter = { $regex: reg };
    } else if (frequency) {
        filter.frequency = frequency;
    }

    Data.find(filter)
        .then(data => {
            // console.log(data)
            response = data.map(item => {
                // console.log(item)
                return {
                    _id: item._id,
                    letter: item.letter,
                    frequency: item.frequency
                }
            })
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(401).json(err)
        })

});

//========ADD=======
router.post('/', function (req, res, next) {
    const { letter, frequency } = req.body
    let response = {
        success: false,
        message: "",
        data: {}
    }

    const data = new Data({
        letter: letter,
        frequency: frequency
    })

    data.save()
        .then(result => {
            response.success = true
            response.message = "data have been added"
            response.data._id = result._id
            response.data.letter = result.letter
            response.data.frequency = result.frequency
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(response)
        })

});




//=====READ=====
// router.get('/', function (req, res, next) {
//     let response = []

//     Data.find()
//         .then(data => {
//             data.forEach(item => {
//                 response.push({
//                     _id: item._id
//                 })
//             })
//         })
//         .catch(err => res.status(500).json(err))
// });

module.exports = router;
