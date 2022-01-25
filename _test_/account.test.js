const request = require("supertest");
const app = require("../index");
const db = require("./db");

beforeAll(async () => await db.connect());

// afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("POST /api/user/register", () => {
  it("should successfully create a user account", () => {
    return request(app)
      .post("/api/user/register")
      .send({
        first_name: "Van",
        last_name: "Hack",
        email: "van@hack.com",
        phone: "+234-8136360931",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should return 400 when field is missing", () => {
    return request(app)
      .post("/api/user/register")
      .send({
        first_name: "Van",
        last_name: "Hack",
        emails: "van@hack.com",
        phone: "+234-8136360931",
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).hasOwnProperty("msg");
      });
  });
});
describe("POST /api/account/create", () => {
  it("should return 400 if a wrong field name is passed", () => {
    return request(app)
      .post("/api/account/create")
      .send({
        emails: "van@hack.com",
      })
      .then((res) => {
        expect(res.status).toBe(403);
      });
  });

  it("should return 200 when correct data is passed", () => {
    return request(app)
      .post("/api/account/create")
      .send({
        email: "van@hack.com",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
  });
});
