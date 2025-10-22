# Quick Reference Guide

## Common Commands

### Docker Compose
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f api

# Rebuild images
docker-compose build

# Remove volumes
docker-compose down -v
```

### Kubernetes
```bash
# Apply manifests
kubectl apply -f kubernetes/

# View pods
kubectl get pods

# View services
kubectl get svc

# View logs
kubectl logs -f deployment/todo-api

# Port forward
kubectl port-forward svc/todo-api 3000:80

# Scale deployment
kubectl scale deployment todo-api --replicas=5

# Rollout status
kubectl rollout status deployment/todo-api

# Rollback
kubectl rollout undo deployment/todo-api
```

### Terraform
```bash
# Initialize
terraform init

# Plan
terraform plan

# Apply
terraform apply

# Destroy
terraform destroy

# Show state
terraform show

# Validate
terraform validate
```

### Git
```bash
# Clone repository
git clone <url>

# Create branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "Description"

# Push changes
git push origin feature/my-feature

# Create pull request
# (via GitHub UI)
```

---

## API Endpoints

### Health Check
```bash
GET /health
# Response: { "status": "healthy", "environment": "production" }
```

### Metrics
```bash
GET /metrics
# Response: Prometheus metrics format
```

### Todos
```bash
# List all todos
GET /api/todos

# Get specific todo
GET /api/todos/:id

# Create todo
POST /api/todos
# Body: { "title": "Learn DevOps" }

# Update todo
PUT /api/todos/:id
# Body: { "title": "Updated title", "completed": true }

# Delete todo
DELETE /api/todos/:id
```

---

## Web Interfaces

| Service | URL | Credentials |
|---------|-----|-------------|
| API | http://localhost:3000 | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3001 | admin/admin |
| Kibana | http://localhost:5601 | - |

---

## File Structure Quick Guide

```
devops-one-shot/
├── app/                    # Application code
│   ├── src/server.js      # Main application
│   ├── Dockerfile         # Container definition
│   └── package.json       # Dependencies
├── docker-compose.yml     # Local dev environment
├── .github/workflows/     # CI/CD pipelines
├── terraform/             # Infrastructure code
├── kubernetes/            # K8s manifests
├── monitoring/            # Prometheus config
├── logging/               # ELK config
└── docs/                  # Documentation
```

---

## Troubleshooting Quick Fixes

### Container won't start
```bash
# Check logs
docker-compose logs api

# Rebuild
docker-compose build --no-cache api

# Restart
docker-compose restart api
```

### Pod not running
```bash
# Check status
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Check events
kubectl get events
```

### Database connection error
```bash
# Test connection
psql -h localhost -U todouser -d tododb

# Check if running
docker ps | grep postgres

# Restart database
docker-compose restart postgres
```

### Metrics not showing
```bash
# Check if app is running
curl http://localhost:3000/health

# Check metrics endpoint
curl http://localhost:3000/metrics

# Check Prometheus targets
# Visit http://localhost:9090/targets
```

---

## Environment Variables

### Application
- `NODE_ENV` - development/production
- `PORT` - API port (default: 3000)

### Database
- `DB_HOST` - Database hostname
- `DB_PORT` - Database port (default: 5432)
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name

### AWS (Terraform)
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

---

## Performance Metrics to Monitor

### Application
- Request rate (requests/sec)
- Response time (p50, p95, p99)
- Error rate (errors/sec)
- CPU usage
- Memory usage

### Database
- Query latency
- Connection count
- Disk usage
- Replication lag

### Infrastructure
- Pod count
- Node utilization
- Network I/O
- Disk I/O

---

## Deployment Checklist

- [ ] Code reviewed
- [ ] Tests passing
- [ ] Security scan passed
- [ ] Image built and pushed
- [ ] Manifests updated
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Runbook prepared
- [ ] Team notified
- [ ] Deployment executed
- [ ] Health checks passing
- [ ] Metrics showing data
- [ ] No errors in logs

---

## Learning Resources

- [CONCEPTS.md](CONCEPTS.md) - DevOps concepts explained
- [SETUP.md](SETUP.md) - Installation and setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment procedures
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture

---

## Getting Help

1. Check logs: `docker-compose logs` or `kubectl logs`
2. Check status: `docker-compose ps` or `kubectl get pods`
3. Read documentation in `docs/`
4. Check GitHub issues
5. Ask team members

