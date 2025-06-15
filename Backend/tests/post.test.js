import { expect } from "chai";
import request from "supertest";
import app from "../server.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

describe("Post API", function () {
  let userData = {
    name: "Test User",
    email: "testuser@example.com",
    username: "testuser",
    password: "password123",
  };
  let user;
  let token;
  let post;

  before(async function () {
    // Create a user via the API to ensure password hashing and any hooks run
    const res = await request(app).post("/api/users/signup").send(userData);
    user = res.body;
    // If your login returns a token, you can extract it here for authenticated routes
    // const loginRes = await request(app).post("/api/users/login").send({ username: userData.username, password: userData.password });
    // token = loginRes.body.token;
  });

  after(async function () {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST /api/posts", function () {
    it("should not create a post without required fields", async function () {
      const res = await request(app)
        .post("/api/posts")
        .send({ text: "Missing postedBy" });
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("error");
    });

    it("should create a post with valid data", async function () {
      const res = await request(app)
        .post("/api/posts")
        .send({ postedBy: user._id, text: "Hello World" });
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("text", "Hello World");
      post = res.body;
    });
  });

  describe("GET /api/posts/:id", function () {
    // it("should get a post by id", async function () {
    //   const res = await request(app).get(`/api/posts/${post._id}`);
    //   expect(res.status).to.equal(200);
    //   expect(res.body).to.have.property("_id", post._id);
    // });

    it("should return 404 for non-existent post", async function () {
      const res = await request(app).get("/api/posts/000000000000000000000000");
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("error");
    });
  });
});