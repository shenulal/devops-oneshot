# Deployment Guide

## Deployment Environments

This project supports three deployment environments:

1. **Local** - Docker Compose on developer machine
2. **Staging** - Kubernetes cluster for testing
3. **Production** - Kubernetes cluster for users

---

## Local Deployment (Docker Compose)

### Quick Start
```bash
docker-compose up -d
```

### Verify
```bash
curl http://localhost:3000/health
```

### Logs
```bash
docker-compose logs -f api
```

### Cleanup
```bash
docker-compose down -v
```

---

## Staging Deployment (Kubernetes)

### Prerequisites
- Kubernetes cluster running (minikube, EKS, GKE, etc.)
- kubectl configured
- Docker image pushed to registry

### Deploy
```bash
# Set image to staging version
kubectl set image deployment/todo-api \
  todo-api=ghcr.io/your-org/todo-api:develop

# Apply manifests
kubectl apply -f kubernetes/

# Verify
kubectl get pods
kubectl get svc
```

### Monitor Deployment
```bash
# Watch rollout
kubectl rollout status deployment/todo-api

# View logs
kubectl logs -f deployment/todo-api

# Port forward
kubectl port-forward svc/todo-api 3000:80
```

### Rollback if Issues
```bash
kubectl rollout undo deployment/todo-api
```

---

## Production Deployment (Kubernetes)

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Security scan passed
- [ ] Database migrations tested
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Runbook prepared

### Deployment Steps

#### 1. Update Image
```bash
kubectl set image deployment/todo-api \
  todo-api=ghcr.io/your-org/todo-api:v1.0.0 \
  --record
```

#### 2. Monitor Rollout
```bash
kubectl rollout status deployment/todo-api -w
```

#### 3. Verify Health
```bash
# Check pod status
kubectl get pods -l app=todo-api

# Check metrics
curl http://localhost:3000/metrics

# Check logs for errors
kubectl logs deployment/todo-api --tail=100
```

#### 4. Smoke Tests
```bash
# Test API endpoints
curl http://api.example.com/health
curl http://api.example.com/api/todos
```

### Rollback Procedure
```bash
# If issues detected
kubectl rollout undo deployment/todo-api

# Verify rollback
kubectl rollout status deployment/todo-api
```

---

## Infrastructure Deployment (Terraform)

### Development Environment
```bash
cd terraform
terraform init
terraform plan -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

### Production Environment
```bash
cd terraform
terraform init
terraform plan -var-file=prod.tfvars
terraform apply -var-file=prod.tfvars
```

### Destroy Infrastructure
```bash
terraform destroy -var-file=prod.tfvars
```

---

## CI/CD Automated Deployment

### Workflow
1. **Push to develop** → Deploy to staging
2. **Push to main** → Deploy to production

### GitHub Actions Configuration
```yaml
# Automatic deployment on push to main
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: |
    kubectl apply -f kubernetes/
    kubectl rollout status deployment/todo-api
```

---

## Database Migrations

### Before Deployment
```bash
# Run migrations
kubectl exec -it deployment/todo-api -- npm run migrate

# Verify
kubectl exec -it deployment/todo-api -- npm run migrate:status
```

### Rollback Database
```bash
# Rollback to previous version
kubectl exec -it deployment/todo-api -- npm run migrate:down
```

---

## Monitoring Deployment

### Check Metrics
```bash
# CPU usage
kubectl top pods -l app=todo-api

# Memory usage
kubectl top nodes
```

### View Logs
```bash
# Real-time logs
kubectl logs -f deployment/todo-api

# Last 100 lines
kubectl logs deployment/todo-api --tail=100

# Previous pod logs (if crashed)
kubectl logs deployment/todo-api --previous
```

### Check Events
```bash
kubectl get events --sort-by='.lastTimestamp'
```

---

## Scaling

### Manual Scaling
```bash
# Scale to 5 replicas
kubectl scale deployment todo-api --replicas=5

# Verify
kubectl get pods
```

### Auto-Scaling
```bash
# HPA automatically scales based on metrics
# Min: 2 replicas, Max: 10 replicas
# Triggers at 70% CPU or 80% memory

kubectl get hpa
kubectl describe hpa todo-api-hpa
```

---

## Troubleshooting Deployments

### Pod Not Starting
```bash
# Check pod status
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Check events
kubectl get events
```

### Image Pull Errors
```bash
# Verify image exists
docker pull ghcr.io/your-org/todo-api:latest

# Check image pull secrets
kubectl get secrets
```

### Service Not Accessible
```bash
# Check service
kubectl get svc todo-api

# Check endpoints
kubectl get endpoints todo-api

# Test connectivity
kubectl run -it --rm debug --image=alpine --restart=Never -- \
  wget -O- http://todo-api/health
```

### High Resource Usage
```bash
# Check resource limits
kubectl describe deployment todo-api

# Check actual usage
kubectl top pods

# Adjust limits if needed
kubectl set resources deployment todo-api \
  --limits=cpu=1,memory=1Gi \
  --requests=cpu=500m,memory=512Mi
```

---

## Post-Deployment

### Verify Everything
- [ ] API responding to requests
- [ ] Metrics being collected
- [ ] Logs being aggregated
- [ ] Alerts configured
- [ ] Monitoring dashboards showing data

### Document Changes
- Update runbooks
- Document any manual steps
- Update architecture diagrams

### Communicate
- Notify team of deployment
- Share deployment notes
- Update status page if applicable

