
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