'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const { expect } = require('chai');
const DataDate = require('../models/DataDate');
const should = chai.should();
chai.use(chaiHTTP);

describe('datadate', function () {
    //menghapus semua data 
    DataDate.collection.drop();

    //sebelum test menambahkan data test
    beforeEach(function (done) {
        let dataDate = new DataDate({
            'letter': '2017-12-31',
            'frequency': 1.1
        });

        dataDate.save(function (err) {
            if (err) console.log(err);
            else {
                done();
            }
        })
    })

    //sesudah test menghapus semua data
    afterEach(function (done) {
        DataDate.collection.drop();
        done();
    })

    // test list daftar data
    it('Seharusnya menampilkan list datadate didapatkan dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/datadate')
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
    it('Seharusnya menambahkan datadate dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/datadate')
            .send({
                'letter': '2020-12-15',
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
                res.body.data.letter.should.equal("2020-12-15")
                res.body.data.frequency.should.equal(2.2)
                done();
            })
    })

    //test edit 
    it('Seharusnya edit datadate dengan metode PUT', function (done) {
        chai.request(server)
            .get('/api/datadate/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .put(`/api/datadate/${id}`)
                    .send({
                        'letter': '2020-12-15',
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
                        res2.body.data.letter.should.equal("2020-12-15")
                        res2.body.data.frequency.should.equal(2.2)
                        done();
                    })
            })
    })


    //test delete
    it('Seharusnya delete datadate dengan metode DELETE', function (done) {
        chai.request(server)
            .get('/api/datadate/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .delete(`/api/datadate/${id}`)
                    .end(function (err, res2) {
                        res2.should.have.status(201);
                        res2.should.be.json;
                        res2.body.should.be.a('object');
                        res2.body.should.have.property('success');
                        res2.body.should.have.property('message');
                        res2.body.should.have.property('data');
                        res2.body.success.should.equal(true);
                        res2.body.message.should.equal("data have been deleted");
                        res2.body.data._id.should.equal(`${id}`)
                        res2.body.data.letter.should.equal("2017-12-31")
                        res2.body.data.frequency.should.equal(1.1)
                        done();
                    })
            })
    })

    //test find data by id
    it('Seharusnya mencari datadate berdasarkan id dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/datadate/')
            .end(function (err, res) {
                let id = res.body[0]._id
                chai.request(server)
                    .get(`/api/datadate/${id}`)
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
                        res2.body.data.letter.should.equal("2017-12-31")
                        res2.body.data.frequency.should.equal(1.1)
                        done();
                    })
            })
    })
    //test browse
    it('Seharusnya mencari datadate berdasarkan req.body dengan metode POST', function (done) {
        chai.request(server)
            .post(`/api/datadate/search`)
            .send({ 'letter': '2017-12-31' })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('2017-12-31');
                chai.request(server)
                    .post(`/api/datadate/search`)
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
                            .post(`/api/datadate/search`)
                            .send({ 'letter': '2017-12-31', 'frequency': 1.1 })
                            .end(function (err, res3) {
                                res3.should.have.status(200);
                                res3.should.be.json;
                                res3.body.should.be.a('array');
                                res3.body[0].should.be.a('object');
                                res3.body[0].should.have.property('_id');
                                res3.body[0].should.have.property('letter');
                                res3.body[0].should.have.property('frequency');
                                res3.body[0].letter.should.equal('2017-12-31');
                                res3.body[0].frequency.should.equal(1.1);
                                done();
                            })
                    })
            })
    })
});