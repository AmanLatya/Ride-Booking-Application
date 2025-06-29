# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user. Validates input, hashes sensitive fields, and returns a JWT token on success.

---

## Request Body

Send as JSON:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullName.firstName`: **required**, string, min 3 chars
- `fullName.lastName`: optional, string, min 3 chars if provided
- `email`: **required**, valid email, min 5 chars
- `password`: **required**, string, min 6 chars

---

## Responses

### Success

- **201 Created**
- Body:
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "<hashed_first_name>",
        "lastName": "<hashed_last_name>"
      },
      "email": "<hashed_email>",
      "password": "<hashed_password>",
      "socketID": null,
      "__v": 0
    }
  }
  ```

### Validation Error

- **400 Bad Request**
- Body:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Missing Fields

- **400 Bad Request**
- Body:
  ```json
  {
    "message": "All Fields required"
  }
  ```

---

## Example Request

```sh
curl -X POST http://localhost:2000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```