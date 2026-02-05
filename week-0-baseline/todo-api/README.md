# Todo API

Simple REST API for managing tasks, built with Node.js and Express.

## Features
- ✅ CRUD operations for tasks
- ✅ PostgreSQL database
- ✅ Health check endpoint
- ✅ Docker support

## Endpoints

### Health Check
```
GET /health
```

### Tasks
```
GET    /tasks       - List all tasks
GET    /tasks/:id   - Get single task
POST   /tasks       - Create task (body: { "title": "..." })
PUT    /tasks/:id   - Update task (body: { "title": "...", "completed": true })
DELETE /tasks/:id   - Delete task
```

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Setup
```bash
# Install dependencies
npm install

# Create database
createdb tododb

# Start the server
npm start

# Or use nodemon for auto-reload
npm run dev
```

### Test endpoints
```bash
# Health check
curl http://localhost:3000/health

# Create task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Kubernetes"}'

# List tasks
curl http://localhost:3000/tasks

# Update task
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete task
curl -X DELETE http://localhost:3000/tasks/1
```
