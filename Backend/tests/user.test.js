import { expect } from "chai";
import request from "supertest";
import app from "../server.js";
import User from "../models/userModel.js";

describe("User API", function () {
  let userData = {
    name: "Test User",
    email: "testuser@example.com",
    username: "testuser",
    password: "password123",
  };
  let user;
  let token;

  afterEach(async function () {
    await User.deleteMany({});
  });

  describe("POST /api/users/signup", function () {
    it("should create a new user", async function () {
      const res = await request(app).post("/api/users/signup").send(userData);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("username", userData.username);
      expect(res.body).to.not.have.property("password");
    });

    it("should not allow duplicate usernames or emails", async function () {
      await request(app).post("/api/users/signup").send(userData);
      const res = await request(app).post("/api/users/signup").send(userData);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error");
    });
  });

  describe("POST /api/users/login", function () {
    beforeEach(async function () {
      await request(app).post("/api/users/signup").send(userData);
    });

    it("should login with correct credentials", async function () {
      const res = await request(app)
        .post("/api/users/login")
        .send({ username: userData.username, password: userData.password });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", userData.username);
    });

    it("should not login with incorrect credentials", async function () {
      const res = await request(app)
        .post("/api/users/login")
        .send({ username: userData.username, password: "wrongpassword" });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error");
    });
  });

  describe("GET /api/users/profile/:query", function () {
    beforeEach(async function () {
      await request(app).post("/api/users/signup").send(userData);
    });

    it("should get user profile by username", async function () {
      const res = await request(app).get(`/api/users/profile/${userData.username}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", userData.username);
    });

    it("should return 404 for non-existent user", async function () {
      const res = await request(app).get(`/api/users/profile/notarealuser`);
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("error");
    });
  });

  describe("POST /api/users/logout", function () {
    it("should logout user", async function () {
      const res = await request(app).post("/api/users/logout");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message");
    });
  });
});