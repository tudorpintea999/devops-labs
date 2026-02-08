# Week 0 - Day 3: Definition of Done

## Completion Criteria

### ✅ kind Cluster with Port Mappings
- [x] Recreated cluster with extraPortMappings (80→80, 443→443)
- [x] Cluster configured for Ingress support
- [x] Node labeled with ingress-ready=true

### ✅ Ingress Controller Setup
- [x] nginx Ingress Controller installed (kind-specific manifest)
- [x] Ingress Controller pod running in ingress-nginx namespace
- [x] Service accessible at localhost:80

### ✅ Service Configuration
- [x] Changed todo-api Service from NodePort to ClusterIP
- [x] Removed nodePort field (not allowed with ClusterIP)
- [x] Service still routes to todo-api pods correctly

### ✅ Ingress Resource
- [x] Created Ingress with hostname todo.local
- [x] Routes / path to todo-api service port 3000
- [x] Uses nginx IngressClass
- [x] Proper pathType: Prefix configuration

### ✅ Local DNS Configuration
- [x] Added 127.0.0.1 todo.local to /etc/hosts
- [x] DNS resolution works

### ✅ Functionality Tests
- [x] curl http://todo.local/health returns 200 OK
- [x] Can create, read, update, delete tasks via Ingress
- [x] No port numbers in URL (clean URLs!)
- [x] Browser access works

### ✅ Understanding
- [x] Know why kind needs extraPortMappings
- [x] Understand ClusterIP vs NodePort vs LoadBalancer
- [x] Know difference between Ingress resource and Ingress Controller
- [x] Understand Layer 7 HTTP routing

## Architecture
```
User → http://todo.local
  ↓
/etc/hosts → 127.0.0.1:80
  ↓
kind port mapping (container:80 → host:80)
  ↓
Ingress Controller (nginx pod)
  ↓
Ingress rules (todo.local → todo-api)
  ↓
todo-api Service (ClusterIP)
  ↓
todo-api Pods
```

## Key Learnings

- kind clusters need extraPortMappings to expose services to host
- ClusterIP services cannot have nodePort field
- Ingress provides clean URLs without port numbers
- Ingress Controller must be installed separately from Ingress resources
- /etc/hosts enables local domain testing

## Test Commands
```bash
# Health check
curl http://todo.local/health

# Create task
curl -X POST http://todo.local/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Ingress is working!"}'

# List tasks
curl http://todo.local/tasks

# Check Ingress
kubectl get ingress
kubectl describe ingress todo-ingress
```

## Troubleshooting Done

- Fixed LoadBalancer pending issue by recreating cluster
- Removed nodePort field from ClusterIP service
- Configured proper port mappings in kind cluster config

---

**Completed:** $(date +%Y-%m-%d)
**Time spent:** ~3 hours (including troubleshooting)
