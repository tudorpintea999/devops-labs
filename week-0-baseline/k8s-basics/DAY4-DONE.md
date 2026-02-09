# Week 0 - Day 4: Definition of Done

## Completion Criteria

### ✅ CI/CD Setup
- [x] Created GitHub Actions workflow at `.github/workflows/ci.yml`
- [x] Workflow triggers on push to main and pull requests
- [x] Uses ubuntu-latest runner

### ✅ Linting Job
- [x] Installed ESLint as dev dependency
- [x] Created lint script in package.json
- [x] Workflow checks out code, installs deps, runs linter
- [x] Fails workflow if linting errors found

### ✅ Build Job
- [x] Builds Docker image in CI
- [x] Only runs if lint job succeeds (needs: lint)
- [x] Uses correct working-directory

### ✅ Dependencies
- [x] Committed package-lock.json for reproducible builds
- [x] Removed package-lock.json from .gitignore
- [x] Dockerfile uses npm ci for faster installs

### ✅ Understanding
- [x] Know difference between workflow, job, and step
- [x] Understand job dependencies with needs
- [x] Know when workflows trigger
- [x] Understand npm ci vs npm install
- [x] Know how to use working-directory

## Workflow Structure
```yaml
Triggers: push to main, pull_request
  ↓
Job: lint (runs first)
  - Checkout code
  - Setup Node.js
  - npm install
  - npm run lint
  ↓
Job: build (needs: lint)
  - Checkout code
  - docker build
```

## Next Steps (Day 5+)
- [ ] Add Docker image push to registry
- [ ] Add test job (unit tests)
- [ ] Add deployment step (CD)
- [ ] Use secrets for credentials

---

**Completed:** $(date +%Y-%m-%d)
**Score:** 9/11 on knowledge check 🎯
