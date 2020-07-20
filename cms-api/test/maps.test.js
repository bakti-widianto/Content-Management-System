'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const { expect } = require('chai');
const Maps = require('../models/Maps');
const should = chai.should();
chai.use(chaiHTTP);


describe('maps', function () {
    //menghapus semua data 
    Maps.collection.drop();

    //sebelum test menambahkan data test
    beforeEach(function (done) {
        let maps = new Maps({
            'title': 'Cihampelas Walk',
            'lat': -6.8965475,
            'lng': 107.6103536
        });

        maps.save(function (err) {
            if (err) console.log(err);
            else {
                done();
            }
        })
    })

    //sesudah test menghapus semua data
    afterEach(function (done) {
        Maps.collection.drop();
        done();
    })


    //test read
    it('Seharusnya menampilkan semua data maps didapatkan dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/maps')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                done();
            })
    })

    //test add 
    it('Seharusnya menambahkan data maps dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/maps')
            .send({
                'title': 'Trans Studio Mall',
                'lat': -6.9261257,
                'lng': 107.6343728
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal("data have been added");
                res.body.data.title.should.equal("Trans Studio Mall");
                res.body.data.lat.should.equal(-6.9261257);
                res.body.data.lng.should.equal(107.6343728);
                done();
            })
    })

    //test edit 
    it('Seharusnya edit data maps dengan metode PUT', function (done) {
        chai.request(server)
            .get('/api/maps/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .put(`/api/maps/${id}`)
                    .send({
                        'title': 'Trans Studio Mall',
                        'lat': -6.9261257,
                        'lng': 107.6343728
                    })
                    .end(function (err, res2) {
                        res2.should.have.status(201);
                        res2.should.be.json;
                        res2.body.should.be.a('object');
                        res2.body.should.have.property('success');
                        res2.body.should.have.property('message');
                        res2.body.should.have.property('data');
                        res2.body.success.should.equal(true);
                        res2.body.message.should.equal("data have been updated");
                        res2.body.data.title.should.equal("Trans Studio Mall");
                        res2.body.data.lat.should.equal(-6.9261257);
                        res2.body.data.lng.should.equal(107.6343728);
                        done();
                    })
            })
    })

    //test delete
    it('Seharusnya delete data maps dengan metode DELETE', function (done) {
        chai.request(server)
            .get('/api/maps/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .delete(`/api/maps/${id}`)
                    .end(function (err, res2) {
                        // console.log(res2.body)
                        res2.should.have.status(201);
                        res2.should.be.json;
                        res2.body.should.be.a('object');
                        res2.body.should.have.property('success');
                        res2.body.should.have.property('message');
                        res2.body.should.have.property('data');
                        res2.body.success.should.equal(true);
                        res2.body.message.should.equal("data have been deleted");
                        res2.body.data._id.should.equal(`${id}`)
                        res2.body.data.title.should.equal("Cihampelas Walk");
                        res2.body.data.lat.should.equal(-6.8965475);
                        res2.body.data.lng.should.equal(107.6103536);
                        done();
                    })
            })
    })

    //test find 
    it('Seharusnya mencari data maps berdasarkan id dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/maps/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .get(`/api/maps/${id}`)
                    .end(function (err, res2) {
                        res2.should.have.status(200);
                        res2.should.be.json;
                        res2.body.should.be.a('object');
                        res2.body.should.have.property('success');
                        res2.body.should.have.property('message');
                        res2.body.should.have.property('data');
                        res2.body.success.should.equal(true);
                        res2.body.message.should.equal("data found");
                        res2.body.data._id.should.equal(`${id}`)
                        res2.body.data.title.should.equal("Cihampelas Walk");
                        res2.body.data.lat.should.equal(-6.8965475);
                        res2.body.data.lng.should.equal(107.6103536);
                        done();
                    })
            })
    })

    //test browse
    it('Seharusnya mencari data berdasarkan req.body dengan metode POST', function (done) {
        chai.request(server)
            .post(`/api/maps/search`)
            .send({ 'title': 'Cihampelas Walk' })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0].title.should.equal("Cihampelas Walk");
                res.body[0].lat.should.equal(-6.8965475);
                res.body[0].lng.should.equal(107.6103536);
                done();
            })
    })

})