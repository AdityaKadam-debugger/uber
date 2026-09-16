
<!-- You can see the actual doc in the preview mode  -->
# Backend API

## Register User

Creates a new user account and returns an authentication token.

### Endpoint

```http
POST /users/register
Content-Type: application/json
```

### Request body

The request body must be valid JSON and contain the following data:

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `fullname.firstname` | string | Yes | At least 3 characters |
| `fullname.lastname` | string | No | If provided, at least 3 characters |
| `email` | string | Yes | Must be a valid email address and at least 5 characters |
| `password` | string | Yes | At least 6 characters |

Example:

```json
{
  "fullname": {
    "firstname": "Aarav",
    "lastname": "Sharma"
  },
  "email": "aarav@example.com",
  "password": "secret123"
}
```

### Responses

#### `201 Created`

Registration succeeded. The response contains an authentication token and the created user.

Example response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "Aarav",
      "lastname": "Sharma"
    },
    "email": "aarav@example.com"
  }
}
```

#### `400 Bad Request`

The request failed validation. The response contains the validation errors.

Example response:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

## Login User

Authenticates an existing user and returns an authentication token.

### Endpoint

```http
POST /users/login
Content-Type: application/json
```

### Request body

The request body must be valid JSON and contain the following data:

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `email` | string | Yes | Must be a valid email address |
| `password` | string | Yes | At least 6 characters |

Example:

```json
{
  "email": "aarav@example.com",
  "password": "secret123"
}
```

### Responses

#### `200 OK`

Login succeeded. The response contains an authentication token and the authenticated user.

Example response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "Aarav",
      "lastname": "Sharma"
    },
    "email": "aarav@example.com"
  }
}
```

#### `400 Bad Request`

The request failed validation. The response contains the validation errors.

Example response:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

The email or password is invalid.

Example response:

```json
{
  "message": "Invalid Email or Password"
}
```

## Get User Profile

Returns the authenticated user's profile details.

### Endpoint

```http
GET /users/profile
Authorization: Bearer <jwt-token>
```

> The server also accepts the token from a cookie named `token`.

### Headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization` | No | Bearer token in the format `Bearer <jwt-token>` |

### Responses

#### `200 OK`

The request was authenticated successfully and returns the current user profile.

Example response:

```json
{
  "_id": "<user-id>",
  "fullname": {
    "firstname": "Aarav",
    "lastname": "Sharma"
  },
  "email": "aarav@example.com",
  "createdAt": "2026-09-17T00:00:00.000Z",
  "updatedAt": "2026-09-17T00:00:00.000Z"
}
```

#### `401 Unauthorized`

The token is missing, expired, invalid, or the user no longer exists.

Example response:

```json
{
  "message": "Unauthorized"
}
```

## Logout User

Logs out the authenticated user by clearing the token cookie and blacklisting the active JWT.

### Endpoint

```http
GET /users/logout
Authorization: Bearer <jwt-token>
```

> The server also accepts the token from a cookie named `token`.

### Headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization` | No | Bearer token in the format `Bearer <jwt-token>` |

### Responses

#### `200 OK`

Logout succeeded. The token cookie is cleared and the JWT is blacklisted.

Example response:

```json
{
  "message": "Logout Successfully"
}
```

#### `401 Unauthorized`

The request is missing a valid authentication token.

Example response:

```json
{
  "message": "Unauthorized"
}
```