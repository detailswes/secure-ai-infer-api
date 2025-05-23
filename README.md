# Secure AI-Inference API (Node.js + JWT + Docker)

This project is a secure AI inference API built with **Node.js** and **Express**, protected with **JWT-based authentication**. It simulates an inference model by reversing input text.

---

## ✨ Features

- `POST /infer` endpoint to process text
- Stub "AI" model (reverses input text)
- JWT-based authentication middleware
- Logs every request and response with timestamp
- Dockerized with a built-in healthcheck
- Unit tests for authentication and inference logic

---

## 📁 Project Structure

```
SECURE-AI-INFER-API/
├── src/
|   |
|   ├──app.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── model/
│   │   └── inference.js         # AI inference logic (text reversal)
│   ├── routes/
│   │   ├── infer.js            # Inference endpoint routes
│   │   └──              # Main Express application
│   └── test/
│       ├── auth.test.js        # Authentication tests
│       └── inference.test.js   # Inference logic tests
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Docker container setup
├── generate-token.js           # JWT token generator utility
├── package-lock.json           # NPM lock file
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

---

## Getting Started

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
NODE_ENV=production
```

---

## Docker Setup & Usage

### Build and run with Docker Compose

```bash
docker-compose up --build
```

### Manual Docker Commands


#### 1. Verify Container is Running
```bash
docker ps
```
You should see the container running with port mapping `0.0.0.0:3000->3000/tcp`. Copy the container ID.

#### 2. Container execution
```bash
docker exec -it <container_id> sh
```

#### 3. Generate a JWT token (Copy it)
```bash
node generate-token.js

```

#### 4. Run All Tests
```bash
npm run test
```

**Expected Output:**
```
Auth Middleware ✅ should fail without token
Inference Endpoint ✅ should return reversed text

2 passing (xx ms)
```

### Test Files
- `test/auth.test.js` - Tests JWT authentication middleware
- `test/inference.test.js` - Tests inference model logic

---

## API Testing Guide

### 1. Healthcheck Endpoint

```bash
GET http://localhost:3000/health
```

**Expected Response:**
```
HEALTH CHECK - OK
```

### 2. Test Inference Endpoint Without Token (Expect Failure)

```bash
POST http://localhost:3000/infer
Content-Type: application/json

{
  "text": "Hello World"
}
```

**Expected Response:**
```json
{
  "error": "Missing token"
}
```

### 3. Test Inference Endpoint With JWT Token

```bash
POST http://localhost:3000/infer
Content-Type: application/json
Authorization: Bearer eyJhbGc...

{
  "text": "Hello World"
}
```

**Expected Response:**
```json
{
  "result": "dlroW olleH"
}
```

---



## API Endpoints Detailed Description

### Health Check
- **GET** `/health`
- **Description:** Check if the API is running
- **Authentication:** None required
- **Response:** Plain text "HEALTH CHECK - OK"

### AI Inference
- **POST** `/infer`
- **Description:** Process text through AI model (reverses input)
- **Authentication:** JWT Bearer token required
- **Request Body:**
  ```json
  {
    "text": "Your input text here"
  }
  ```
- **Response:**
  ```json
  {
    "result": "reversed text output"
  }
  ```