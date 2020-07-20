'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const User = require("../models/Users");
const { expect } = require('chai');
const { response } = require('express');
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {
    //menghapus semua data 
    User.collection.drop();

    //sebelum test menambahkan data test
    beforeEach(function (done) {
        let user = new User({
            email: 'test@gmail.com',
            password: 'testing',
            token: ''
        });

        user.save(function (err) {
            if (err) console.log(err);
            else {
                done();
            }
        })
    })

    //sesudah test menghapus semua data
    afterEach(function (done) {
        User.collection.drop();
        done();
    })

    //test register user
    it('seharusnya data user berhasil di tambhakan dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/register')
            .send({
                'email': 'bakti.widianto@gmail.com',
                'password': '112233',
                'retypepassword': '112233'
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.should.have.property('token');
                expect(res.body.token).to.exist;
                res.body.message.should.equal('register success');
                res.body.data.email.should.equal('bakti.widianto@gmail.com');
                done();
            })
    })

    //test login user
    it('seharusnya berhasil login dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                'email': 'test@gmail.com',
                'password': 'testing'
            })
            .end(function (err, res) {
                console.log(res.body)
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.should.have.property('token');
                expect(res.body.token).to.exist;
                res.body.message.should.equal('Authentication Success');
                res.body.data.email.should.equal('test@gmail.com');
                done();
            })
    })

    //check token
    it('seharusnya berhasil check token dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                'email': 'test@gmail.com',
                'password': 'testing'
            })
            .end(function (err, response) {
                const token = response.body.token;
                chai.request(server)
                    .post('/api/users/check')
                    .set('token', token)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('valid');
                        res.body.valid.should.equal(true);
                        done()
                    });
            })
    })

    //destroy token
    it('seharusnya berhasil destroy token dengan metode GET', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                'email': 'test@gmail.com',
                'password': 'testing'
            })
            .end(function (err, response) {
                const token = response.body.token;
                chai.request(server)
                    .get('/api/users/logout')
                    .set('token', token)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('logout');
                        res.body.logout.should.equal(true);
                        done()
                    });
            })
    })


})