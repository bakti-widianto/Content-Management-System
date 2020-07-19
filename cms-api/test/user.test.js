'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const User = require("../models/Users");
const { expect } = require('chai');
const { getMaxListeners } = require('../models/Users');
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
            if (err) console.log(err)
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
                res.body.response.should.have.property("message");
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('token');
                expect(res.body.response.token).to.exist;
                res.body.response.message.should.equal('register success');
                res.body.response.data.email.should.equal('bakti.widianto@gmail.com');
                done();
            })
    })


})