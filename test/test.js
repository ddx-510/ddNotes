//Require the dev-dependencies
require('dotenv').config();
let chai = require('chai');
let chaiHttp = require('chai-http');
let Server = require('../models/server');
let server = new Server();
server.listen();

chai.use(chaiHttp);
let should = chai.should();

describe("Users", () => {
    describe("POST /api/auth/login", () => {
        // Test to get all user notes record
        it("should able to login", (done) => {
            let user = {
                name: "ddx",
                email: "ddxtest1@gmail.com",
                password: '12345'
            }
            chai.request("localhost:8080")
                .post("/api/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });
    });

    describe("POST /api/auth/login", () => {
        // Test to login
        it("should not able to login, wrong password email match", (done) => {
            let user = {
                name: "ddx",
                email: "ddxtest1@gmail.com",
                password: '1235'
            }
            chai.request("localhost:8080")
                .post("/api/auth/login")
                .send(user)
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
         });
    });

    describe("POST /api/auth/login", () => {
        // Test to login
        it("should not able to login, not an email", (done) => {
            let user = {
                name: "ddx",
                email: "ddxtest0",
                password: '1235'
            }
            chai.request("localhost:8080")
                .post("/api/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
         });
    });

    describe("GET /api/notes/show/user_id", () => {
        // Test to get all user notes record
        it("should get all notes record of a user", (done) => {
            const id = 1;
            chai.request("localhost:8080")
                .get(`/api/notes/show/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });
    });

    describe("GET /api/notes/show/user_id", () => {
        // Test to get all user notes record
        it("should not get any record, wrong user_id", (done) => {
            const id = -1;
            chai.request("localhost:8080")
                .get(`/api/notes/show/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.allNotes.length.should.eql(0);
                    done();
                });
         });
    });

    describe("PUT /api/notes/saveOrReplace", () => {
        // Test to get all user notes record
        it("should able to save a file", (done) => {
            let save = {
                user_id: "1",
                title: "test",
                body: "testabcd"
            }
            chai.request("localhost:8080")
                .put("/api/notes/saveOrReplace")
                .send(save)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });
    });

    describe("DELETE /api/notes/deleteNote/notes_id", () => {
        // Test to get all user notes record
        it("should delete the notes with notes id", (done) => {
            const id = 0;
            chai.request("localhost:8080")
                .delete(`/api/notes/deleteNote/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });
    });

});