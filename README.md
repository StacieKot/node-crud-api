# CRUD API

## How to install

1. Clone repository

`git clone https://github.com/StacieKot/node-crud-api.git`

2. Move to node-crud-api folder

`cd node-crud-api`

3. Switch to develop branch

`git checkout develop`

4. Install packages

`npm install`

5. Change the name of .env.example file to .env

## How to run

Run the app in development mode

`npm run start:dev`

Run the app in production mode

`npm run start:prod`

Run the app in cluster mode

`npm run start:multi`

Run tests

`npm test`

# API

## **Get Users**

- **URL**

  /api/users

- **Method:**

  `GET`

- **Headers:**

  `Content-Type: application/json`

- **Success Response:**

  - **Code:** 200 OK  
    **Content:**

```
{
	"data": [
		{
		"username": "Nastya",
		"age": 32,
		"hobbies": ["photo"],
		"id": "6d537415-fdbb-4d91-9993-352f80bdc3fb"
		}
	],
	"message": "OK"
}
```

## **Get User**

- **URL**

  `api/users/{userId}`

- **Method:**

  `GET`

- **Headers:**

  `Content-Type: application/json`

- **Success Response:**

  - **Code:** 200 OK  
    **Content:**

```
{
	"data": {
		"username": "Nastya",
		"age": 32,
		"hobbies": ["photo"],
		"id": "6d537415-fdbb-4d91-9993-352f80bdc3fb"
	},
	"message": "OK"
}
```

- **`userId` is invalid:**

  - **Code:** 400 Bad Request  
    **Content:**

```
{
	"message": "Invalid UUID"
}
```

- **`userId` doesn't exist:**

  - **Code:** 404 Not found
    **Content:**

```
{
	"message": "User not found"
}
```

## **Create User**

- **URL**

  api/users

- **Method:**

  `POST`

- **Headers:**

  `Content-Type: application/json`

- **Data Params**

`{
	username: string;
	age: number;
	hobbies: string[];
 }`

- **Success Response:**

  - **Code:** 201 Created  
    **Content:**

```
{
	"data": {
		"username": "Nastya",
		"age": 32,
		"hobbies": ["photo"],
		"id": "73f27760-00cb-424c-a541-641277b99add"
	},
	"message": "User was successfully created"
}
```

- **`body` does not contain **required** fields:**

  - **Code:** 400 Bad Request  
    **Content:**

```
{
	"message": "age field is required"
}
```

## **Update User**

- **URL**

  `api/users/{userId}`

- **Method:**

  `PUT`

- **Headers:**

  `Content-Type: application/json`

- **Data Params**

`{
	username: string;
	age: number;
	hobbies: string[];
 }`

- **Success Response:**

  - **Code:** 200 OK  
    **Content:**

```
{
	"data": {
		"hobbies": ["photo, yoga"],
		"username": "Nastya",
		"age": 32,
		"id": "73f27760-00cb-424c-a541-641277b99add"
	},
	"message": "OK"
}
```

- **`body` does not contain **required** fields:**

  - **Code:** 400 Bad Request  
    **Content:**

```
{
	"message": "hobbies field is required"
}
```

- **`userId` is invalid:**

  - **Code:** 400 Bad Request  
    **Content:**

```
{
	"message": "Invalid UUID"
}
```

- **`userId` doesn't exist:**

  - **Code:** 404 Not found
    **Content:**

```
{
	"message": "User not found"
}
```

## **Delete User**

- **URL**

  `api/users/{userId}`

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 204 No Content

- **`userId` is invalid:**

  - **Code:** 400 Bad Request  
    **Content:**

```
{
	"message": "Invalid UUID"
}
```

- **`userId` doesn't exist:**

  - **Code:** 404 Not found
    **Content:**

```
{
	"message": "User not found"
}
```
