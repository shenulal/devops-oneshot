# Setup Guide

## Prerequisites

### Required Tools
- Docker & Docker Compose (v20.10+)
- Git
- Node.js 18+ (for local development)
- kubectl (for Kubernetes)
- Terraform (for IaC)
- AWS CLI (for AWS operations)

### Installation

**macOS (using Homebrew):**
```bash
brew install docker docker-compose git node kubectl terraform awscli
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose git nodejs kubectl terraform awscli
```

**Windows:**
- Download Docker Desktop from docker.com
- Download Git from git-scm.com
- Download Node.js from nodejs.org
- Download kubectl, terraform, awscli using chocolatey or direct downloads

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd devops-one-shot
```

### 2. Create Environment File
```bash
cat > .env << EOF
DB_USER=todouser
DB_PASSWORD=todopass
DB_NAME=tododb
NODE_ENV=development
EOF
```

### 3. Start Services with Docker Compose
```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Todo API on port 3000
- Prometheus on port 9090
- Grafana on port 3001

### 4. Verify Services
```bash
# Check API health
curl http://localhost:3000/health

# Check metrics
curl http://localhost:3000/metrics

# Check Prometheus
curl http://localhost:9090/-/healthy
```

### 5. Access Web Interfaces
- **API**: http://localhost:3000
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)

---

## Local Development (Without Docker)

### 1. Install Node Dependencies
```bash
cd app
npm install
```

### 2. Start PostgreSQL (using Docker)
```bash
docker run -d \
  --name postgres \
  -e POSTGRES_USER=todouser \
  -e POSTGRES_PASSWORD=todopass \
  -e POSTGRES_DB=tododb \
  -p 5432:5432 \
  postgres:15-alpine
```

### 3. Start Application
```bash
npm start
```

---

## Kubernetes Setup

### 1. Create Kubernetes Cluster
```bash
# Using minikube (local)
minikube start --cpus=4 --memory=8192

# Or using AWS EKS
aws eks create-cluster --name todo-cluster --version 1.27 ...
```

### 2. Apply Kubernetes Manifests
```bash
kubectl apply -f kubernetes/
```

### 3. Verify Deployment
```bash
kubectl get pods
kubectl get svc
kubectl logs -f deployment/todo-api
```

### 4. Port Forward to Access API
```bash
kubectl port-forward svc/todo-api 3000:80
curl http://localhost:3000/api/todos
```

---

## Terraform Setup

### 1. Initialize Terraform
```bash
cd terraform
terraform init
```

### 2. Create terraform.tfvars
```bash
cat > terraform.tfvars << EOF
aws_region = "us-east-1"
db_password = "SecurePassword123!"
EOF
```

### 3. Plan Infrastructure
```bash
terraform plan
```

### 4. Apply Infrastructure
```bash
terraform apply
```

### 5. Destroy Infrastructure (when done)
```bash
terraform destroy
```

---

## CI/CD Setup

### 1. GitHub Repository Setup
- Push code to GitHub
- Enable GitHub Actions in repository settings
- Add secrets:
  - `REGISTRY_TOKEN` - GitHub Container Registry token
  - `AWS_ACCESS_KEY_ID` - AWS credentials
  - `AWS_SECRET_ACCESS_KEY` - AWS credentials

### 2. Workflow Triggers
- Automatically runs on push to `main` or `develop`
- Runs on pull requests
- Can be manually triggered

### 3. View Workflow Status
- Go to repository → Actions tab
- Click on workflow run to see details

---

## Monitoring Setup

### 1. Access Prometheus
```bash
# Local: http://localhost:9090
# Query metrics: http_requests_total
```

### 2. Access Grafana
```bash
# Local: http://localhost:3001
# Login: admin/admin
# Add Prometheus as data source
# Import dashboards
```

### 3. Create Custom Dashboard
1. Go to Grafana
2. Click "+" → Dashboard
3. Add panels with PromQL queries
4. Example: `rate(http_requests_total[5m])`

---

## Troubleshooting

### Docker Issues
```bash
# View logs
docker-compose logs -f api

# Restart services
docker-compose restart

# Clean up
docker-compose down -v
```

### Kubernetes Issues
```bash
# Check pod status
kubectl describe pod <pod-name>

# View logs
kubectl logs <pod-name>

# Check events
kubectl get events
```

### Database Connection Issues
```bash
# Test connection
psql -h localhost -U todouser -d tododb

# Check if service is running
docker ps | grep postgres
```

---

## Next Steps

1. Read [CONCEPTS.md](CONCEPTS.md) to understand each component
2. Explore the application code in `app/src/`
3. Modify the application and see CI/CD in action
4. Deploy to Kubernetes cluster
5. Set up monitoring dashboards
6. Configure alerts

