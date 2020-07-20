var express = require('express');
var router = express.Router();
const Maps = require('../models/Maps');

//=======ADD=======
router.post('/', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }

    const maps = new Maps({
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    })

    maps.save()
        .then(result => {
            response.success = true
            response.message = "data have been added"
            response.data._id = result._id
            response.data.title = result.title
            response.data.lat = result.lat
            response.data.lng = result.lng
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(response)
        })
});

// =======READ=======
router.get('/', function (req, res, next) {
    let response = []

    Maps.find()
        .then(data => {
            // console.log(data)
            response = data.map(item => {
                return {
                    _id: item._id,
                    title: item.title,
                    lat: item.lat,
                    lng: item.lng
                }
            })
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

//======EDIT======
router.put('/:id', function (req, res, next) {
    let id = req.params.id
    let { title, lat, lng } = req.body
    let response = {
        success: false,
        message: "",
        data: {}
    }

    Maps.findByIdAndUpdate(id, { title, lat, lng }, { new: true })
        .then(data => {
            response.success = true
            response.message = "data have been updated"
            response.data._id = data._id
            response.data.title = data.title
            response.data.lat = data.lat
            response.data.lng = data.lng
            res.status(201).json(response)
        })
        .catch(err => {
            response.message = "update failed"
            res.status(500).json(response)
        })
});

//=======DELETE========
router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    let response = {
        success: false,
        message: "",
        data: {}
    }

    Maps.findByIdAndRemove(id)
        .then(data => {
            response.success = true
            response.message = "data have been deleted"
            response.data._id = data._id
            response.data.title = data.title
            response.data.lat = data.lat
            response.data.lng = data.lng
            res.status(201).json(response)
        })
        .catch(err => {
            response.message = "delete failed"
            res.status(500).json(response)
        })
});

//==========FIND=========
router.get('/:id', function (req, res, next) {
    let id = req.params.id
    let response = {
        success: false,
        message: "",
        data: {}
    }

    Maps.findById(id)
        .then(data => {
            response.success = true
            response.message = "data found"
            response.data._id = data._id
            response.data.title = data.title
            response.data.lat = data.lat
            response.data.lng = data.lng
            res.status(200).json(response)
        })
        .catch(err => {
            response.message = "data not found"
            res.status(500).json(response)
        })


});

//====BROWSE====
router.post('/search', function (req, res, next) {
    let reg = new RegExp(req.body.title, 'i');
    let response = []
    let filter = {}

    if (req.body.title) {
        filter.title = { $regex: reg }
    }

    Maps.find(filter)
        .then(data => {
            response = data.map(item => {
                return {
                    _id: item._id,
                    title: item.title,
                    lat: item.lat,
                    lng: item.lng
                }
            })
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(401).json(err)
        })

});
module.exports = router;
