# API Documentation

## Base URL

All API requests are made to the Lovable Cloud backend. The base URL is automatically configured in the application.

## Authentication

All API requests (except signup/login) require authentication via JWT tokens. Tokens are automatically attached to requests by the Supabase client.

---

## Auth Endpoints

### Register User

Create a new user account.

**Request:**
```http
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "options": {
    "data": {
      "full_name": "John Doe"
    }
  }
}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token",
    "expires_in": 3600
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "User already registered"
}
```

---

### Login User

Authenticate an existing user.

**Request:**
```http
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token",
    "expires_in": 3600
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "Invalid login credentials"
}
```

---

### Logout User

End the current session.

**Request:**
```http
POST /auth/v1/logout
Authorization: Bearer <access_token>
```

**Response (Success - 204):**
No content

---

## Profile Endpoints

### Get Profile

Retrieve the authenticated user's profile.

**Request:**
```http
GET /rest/v1/profiles?user_id=eq.<user_id>&select=*
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "full_name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

---

### Update Profile

Update the authenticated user's profile.

**Request:**
```http
PATCH /rest/v1/profiles?user_id=eq.<user_id>
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "full_name": "John Updated",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```

**Response (Success - 200):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "full_name": "John Updated",
    "avatar_url": "https://example.com/new-avatar.jpg",
    "updated_at": "2024-01-01T12:00:00Z"
  }
]
```

---

## Task Endpoints

### Get All Tasks

Retrieve all tasks for the authenticated user.

**Request:**
```http
GET /rest/v1/tasks?select=*&order=created_at.desc
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "in_progress",
    "priority": "high",
    "due_date": "2024-01-15",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

---

### Create Task

Create a new task.

**Request:**
```http
POST /rest/v1/tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "due_date": "2024-01-20",
  "user_id": "<user_id>"
}
```

**Response (Success - 201):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "New task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "due_date": "2024-01-20",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

**Validation Rules:**
- `title`: Required, max 200 characters
- `description`: Optional, max 2000 characters
- `status`: Required, one of: "pending", "in_progress", "completed"
- `priority`: Required, one of: "low", "medium", "high"
- `due_date`: Optional, ISO date format (YYYY-MM-DD)

---

### Update Task

Update an existing task.

**Request:**
```http
PATCH /rest/v1/tasks?id=eq.<task_id>
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

**Response (Success - 200):**
```json
[
  {
    "id": "uuid",
    "title": "Updated title",
    "status": "completed",
    "updated_at": "2024-01-01T12:00:00Z"
  }
]
```

---

### Delete Task

Delete a task.

**Request:**
```http
DELETE /rest/v1/tasks?id=eq.<task_id>
Authorization: Bearer <access_token>
```

**Response (Success - 204):**
No content

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "Validation failed"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Access denied by RLS policy"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

---

## Postman Collection Outline

### Collection Structure

```
TaskFlow API
├── Auth
│   ├── Register User
│   ├── Login User
│   └── Logout User
├── Profile
│   ├── Get Profile
│   └── Update Profile
└── Tasks
    ├── Get All Tasks
    ├── Create Task
    ├── Update Task
    └── Delete Task
```

### Environment Variables

```json
{
  "base_url": "{{SUPABASE_URL}}",
  "api_key": "{{SUPABASE_ANON_KEY}}",
  "access_token": "{{JWT_TOKEN}}"
}
```

### Collection Variables

Set after login:
- `access_token`: JWT from login response
- `user_id`: User ID from login response

### Headers (All Requests)

```
apikey: {{api_key}}
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

---

## Rate Limits

- **Authentication**: 5 requests per minute per IP
- **API Requests**: 100 requests per minute per user
- **File Uploads**: 10 requests per minute per user

## Data Limits

- Maximum request body size: 1MB
- Maximum rows per query: 1000
- Maximum concurrent connections: 100 per project
