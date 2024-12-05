# User Registration Endpoint Documentation

## Endpoint

`POST /user/register`

## Description

This endpoint allows a new user to register by providing the necessary information.

## Request Body

The request body must be in JSON format and include the following fields:

- `username` (string, required): The desired username for the new user.
- `password` (string, required): The password for the new user.
- `email` (string, required): The email address of the new user.
- `firstName` (string, optional): The first name of the new user.
- `lastName` (string, optional): The last name of the new user.

### Example Request

```json
{
  "username": "newuser",
  "password": "password123",
  "email": "newuser@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## Response

### Success Response

- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "12345"
  }
  ```

### Error Responses

- **Status Code**: `400 Bad Request`

  - **Body**:
    ```json
    {
      "error": "Invalid request data"
    }
    ```

- **Status Code**: `409 Conflict`

  - **Body**:
    ```json
    {
      "error": "Username or email already exists"
    }
    ```

- **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "An unexpected error occurred"
    }
    ```

# User Login Endpoint Documentation

## Endpoint

`POST /user/login`

## Description

This endpoint allows an existing user to log in by providing their email and password.

## Request Body

The request body must be in JSON format and include the following fields:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password of the user.

### Example Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Response

### Success Response

- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "message": "User logged in successfully",
    "token": "jwt-token"
  }
  ```

### Error Responses

- **Status Code**: `400 Bad Request`

  - **Body**:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

- **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "An unexpected error occurred"
    }
    ```
    # User Profile Endpoint Documentation

## Endpoint

`GET /user/profile`

## Description

This endpoint allows an authenticated user to retrieve their profile information.

## Request Headers

- `Authorization` (string, required): The JWT token of the authenticated user.

### Example Request

```http
GET /user/profile HTTP/1.1
Host: example.com
Authorization: Bearer jwt-token
```

## Response

### Success Response

- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "userProfile": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "user@example.com",
      "socketId": "someSocketId",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "success": true,
    "msg": "User profile retrieved successfully"
  }
  ```

### Error Responses

- **Status Code**: `401 Unauthorized`

  - **Body**:
    ```json
    {
      "msg": "No token provided. Access denied."
    }
    ```

- **Status Code**: `404 Not Found`

  - **Body**:
    ```json
    {
      "msg": "User not found"
    }
    ```

- **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "msg": "An unexpected error occurred"
    }
    ```

# User Logout Endpoint Documentation

## Endpoint

`GET /user/logout`

## Description

This endpoint allows an authenticated user to log out by blacklisting their JWT token.

## Request Headers

- `Authorization` (string, required): The JWT token of the authenticated user.

### Example Request

```http
GET /user/logout HTTP/1.1
Host: example.com
Authorization: Bearer jwt-token
```

## Response

### Success Response

- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "msg": "User logged out successfully",
    "success": true
  }
  ```

### Error Responses

- **Status Code**: `401 Unauthorized`

  - **Body**:
    ```json
    {
      "msg": "No token provided. Access denied."
    }
    ```

- **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "msg": "An unexpected error occurred"
    }
    ```
