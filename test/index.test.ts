import request from "supertest";
import { app } from "../src/app";
import { StatusMessage } from "../src/constants";
import { IUser } from "../src/store";
import { validationMessage } from "../src/utils";

const API = "/api/users";

describe("First scenario - create/update/delete user", () => {
  const newUser: IUser = {
    username: "Anna",
    age: 30,
    hobbies: ["photo"],
  };

  test("GET /api/users should return an empty array and status code 200", async () => {
    const response = await request(app).get(API);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  test("POST /api/users should create new user and return newly created record with status code 201 if the user was created successfully", async () => {
    const response = await request(app).post(API).send(JSON.stringify(newUser));

    const user = response.body.data;
    newUser.id = user.id;

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toEqual(newUser);
  });

  test("GET /api/users/${userId} should return user by id and return status code 200", async () => {
    const response = await request(app).get(`${API}/${newUser.id}`);
    const user = response.body.data;

    expect(response.statusCode).toBe(200);
    expect(user).toEqual(newUser);
  });

  test("PUT /api/users/${userId} should update user by id and return status code 200", async () => {
    const response = await request(app)
      .put(`${API}/${newUser.id}`)
      .send(JSON.stringify({ ...newUser, age: 35 }));

    expect(response.statusCode).toBe(200);

    const user = response.body.data;
    expect(user).not.toEqual(newUser);
    expect(user.id).toEqual(newUser.id);
    expect(user.age).toBe(35);
  });

  test("DELETE /api/users/${userId} should delete user by id and return status code 204", async () => {
    const response = await request(app).delete(`${API}/${newUser.id}`);

    expect(response.statusCode).toBe(204);
  });
});

describe("Second scenario - create user validation", () => {
  ("");
  test("POST /api/users/${userId} should answer with status code 400 and `age field is required` message if request body does not contain age field", async () => {
    const response = await request(app)
      .post(API)
      .send(
        JSON.stringify({
          username: "Anna",
          hobbies: ["photo"],
        })
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      `age ${validationMessage.fieldIsRequired}`
    );
  });

  test("POST /api/users/${userId} should answer with status code 400 and `username field is required` message if request body does not contain username field", async () => {
    const response = await request(app)
      .post(API)
      .send(
        JSON.stringify({
          age: 30,
          hobbies: ["photo"],
        })
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      `username ${validationMessage.fieldIsRequired}`
    );
  });

  test("POST /api/users/${userId} should answer with status code 400 and `hobbies field is required` message if request body does not contain hobbies field", async () => {
    const response = await request(app)
      .post(API)
      .send(
        JSON.stringify({
          username: "Anna",
          age: 30,
        })
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      `hobbies ${validationMessage.fieldIsRequired}`
    );
  });

  test("POST /api/users/${userId} should answer with status code 400 and corresponding message if hobbies field in request body has invalid format", async () => {
    const response = await request(app)
      .post(API)
      .send(
        JSON.stringify({
          username: "Anna",
          age: 30,
          hobbies: [undefined],
        })
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(validationMessage.invalidHobbiesFormat);
  });
});

describe("Third scenario - get/update/delete not existing user", () => {
  const user: IUser = {
    username: "Anna",
    age: 30,
    hobbies: ["travel"],
  };

  test("GET /api/users/${userId} should return status code 400 and corresponding message if userId is not a valid uuid", async () => {
    const response = await request(app).get(`${API}/some-user-id}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(StatusMessage.badUUID);
  });

  test("GET /api/users/${userId} should return status code 404 and corresponding message if user with such userId doesn't exist", async () => {
    const response = await request(app).get(
      `${API}/34d8ab3d-6a3f-41c0-b112-6845287958c8`
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(StatusMessage.userNotFound);
  });

  test("PUT /api/users/${userId} should return status code 400 and corresponding message if userId is not a valid uuid", async () => {
    const response = await request(app)
      .put(`${API}/some-user-id}`)
      .send(JSON.stringify(user));

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(StatusMessage.badUUID);
  });

  test("PUT /api/users/${userId} should return status code 404 and corresponding message if user with such userId doesn't exist", async () => {
    const response = await request(app)
      .put(`${API}/34d8ab3d-6a3f-41c0-b112-6845287958c8`)
      .send(JSON.stringify(user));

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(StatusMessage.userNotFound);
  });

  test("DELETE /api/users/${userId} should return status code 400 and corresponding message if userId is not a valid uuid", async () => {
    const response = await request(app).delete(`${API}/some-user-id}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(StatusMessage.badUUID);
  });

  test("DELETE /api/users/${userId} should return status code 404 and corresponding message if user with such userId doesn't exist", async () => {
    const response = await request(app).delete(
      `${API}/34d8ab3d-6a3f-41c0-b112-6845287958c8`
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(StatusMessage.userNotFound);
  });
});
