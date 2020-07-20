'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const { expect } = require('chai');
const Data = require('../models/Data');
const should = chai.should();
chai.use(chaiHTTP);

describe('data', function () {
    //menghapus semua data 
    Data.collection.drop();

    //sebelum test menambahkan data test
    beforeEach(function (done) {
        let data = new Data({
            'letter': 'A',
            'frequency': 1.1
        });

        data.save(function (err) {
            if (err) console.log(err);
            else {
                done();
            }
        })
    })

    //sesudah test menghapus semua data
    afterEach(function (done) {
        Data.collection.drop();
        done();
    })

    // test list daftar data
    it('Seharusnya menampilkan list data didapatkan dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                done();
            })
    })

    //test add 
    it('Seharusnya menambahkan data dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/data')
            .send({
                'letter': 'b',
                'frequency': 2.2
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
                res.body.data.letter.should.equal("b")
                res.body.data.frequency.should.equal(2.2)
                done();
            })
    })

    //test edit 
    it('Seharusnya edit data dengan metode PUT', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .put(`/api/data/${id}`)
                    .send({
                        'letter': 'B',
                        'frequency': 2.2
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
                        res2.body.data.letter.should.equal("B")
                        res2.body.data.frequency.should.equal(2.2)
                        done();
                    })
            })
    })


    //test delete
    it('Seharusnya delete data dengan metode DELETE', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .delete(`/api/data/${id}`)
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
                        res2.body.data.letter.should.equal("A")
                        res2.body.data.frequency.should.equal(1.1)
                        done();
                    })
            })
    })

    //test find data by id
    it('Seharusnya mencari data berdasarkan id dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .get(`/api/data/${id}`)
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
                        res2.body.data.letter.should.equal("A")
                        res2.body.data.frequency.should.equal(1.1)
                        done();
                    })
            })
    })
    //test browse
    it('Seharusnya mencari data berdasarkan req.body dengan metode POST', function (done) {
        chai.request(server)
            .post(`/api/data/search`)
            .send({ 'letter': 'A' })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                chai.request(server)
                    .post(`/api/data/search`)
                    .send({ 'frequency': 1.1 })
                    .end(function (err, res2) {
                        res2.should.have.status(200);
                        res2.should.be.json;
                        res2.body.should.be.a('array');
                        res2.body[0].should.be.a('object');
                        res2.body[0].should.have.property('_id');
                        res2.body[0].should.have.property('letter');
                        res2.body[0].should.have.property('frequency');
                        res2.body[0].frequency.should.equal(1.1);
                        chai.request(server)
                            .post(`/api/data/search`)
                            .send({ 'letter': 'A', 'frequency': 1.1 })
                            .end(function (err, res3) {
                                res3.should.have.status(200);
                                res3.should.be.json;
                                res3.body.should.be.a('array');
                                res3.body[0].should.be.a('object');
                                res3.body[0].should.have.property('_id');
                                res3.body[0].should.have.property('letter');
                                res3.body[0].should.have.property('frequency');
                                res3.body[0].letter.should.equal('A');
                                res3.body[0].frequency.should.equal(1.1);
                                done();
                            })
                    })
            })
    })
});