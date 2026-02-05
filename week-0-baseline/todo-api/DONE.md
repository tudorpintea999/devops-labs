# Week 0 - Day 1: Definition of Done

## Completion Criteria

### ✅ Application Requirements
- [x] REST API with CRUD endpoints for tasks
- [x] PostgreSQL database integration
- [x] Health check endpoint returns DB status
- [x] Proper error handling and logging

### ✅ Docker Requirements
- [x] Dockerfile builds successfully
- [x] Multi-stage build for optimization (optional)
- [x] Image size reasonable (<200MB for Node.js app)
- [x] docker-compose.yml with API + DB services

### ✅ Functionality Tests
- [x] `GET /health` returns 200 with database status
- [x] `POST /tasks` creates a new task
- [x] `GET /tasks` lists all tasks
- [x] `PUT /tasks/:id` updates a task
- [x] `DELETE /tasks/:id` deletes a task
- [x] Data persists after `docker-compose restart`

### ✅ Development Workflow
- [x] Can run locally with `docker-compose up`
- [x] Can rebuild with `docker-compose up --build`
- [x] Can wipe data with `docker-compose down -v`
- [x] Environment variables in .env file

### ✅ Documentation
- [x] README.md with setup instructions
- [x] API endpoints documented
- [x] .env.example for configuration reference

## Manual Test Commands
```bash
# Start the stack
docker-compose up --build

# In another terminal:

# Health check
curl http://localhost:3000/health

# Create task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Kubernetes deployment"}'

# List tasks
curl http://localhost:3000/tasks

# Update task (replace :id with actual ID)
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete task
curl -X DELETE http://localhost:3000/tasks/1

# Test data persistence
docker-compose restart
curl http://localhost:3000/tasks  # Should still show tasks
```

## Next Steps (Day 2)
- [ ] Create Kubernetes manifests (Deployment, Service)
- [ ] Deploy to local kind cluster
- [ ] Verify app runs in K8s

## Lessons Learned
- Docker layer caching optimization
- Container networking (service names as DNS)
- Healthchecks for startup dependencies
- Volume persistence vs ephemeral data

---

**Completed:** 2026-02-05
**Time spent:** ~2-3 hours
