# Student Management REST API
Web Dev III (Node.js & Express) – Lab Assignment 2

## Setup
```
npm install
npm start
```
Server runs at `http://localhost:3000`

## Structure
```
app.js
routes/studentRoutes.js
middleware/logger.js
data/students.js
```

## Endpoints (test in Postman)
| Method | URL | Body (JSON) | Success |
|---|---|---|---|
| GET | /students | – | 200 |
| GET | /students/:id | – | 200 (404 if missing) |
| POST | /students | `{"name":"Neha","course":"BCA"}` | 201 (400 if invalid) |
| PUT | /students/:id | `{"name":"Neha","course":"BTech"}` | 200 (400/404) |
| DELETE | /students/:id | – | 200 (404 if missing) |

Data is stored in an in-memory array (no database).
