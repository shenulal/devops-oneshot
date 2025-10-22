# DevOps One-Shot: Complete Learning Project

A comprehensive DevOps project demonstrating all core concepts in a single, practical example.

## 📋 Project Overview

This project is a **simple Todo API** deployed across the entire DevOps lifecycle:
- **Application**: Node.js REST API with PostgreSQL database
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Infrastructure**: Terraform for cloud provisioning
- **Orchestration**: Kubernetes for container management
- **Monitoring**: Prometheus & Grafana for metrics
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logs
- **Configuration Management**: Environment-based configs

## 🏗️ Project Structure

```
devops-one-shot/
├── app/                          # Application code
│   ├── src/
│   │   ├── server.js            # Express server
│   │   ├── db.js                # Database connection
│   │   └── routes.js            # API routes
│   ├── package.json
│   ├── Dockerfile               # Container image definition
│   └── .dockerignore
├── docker-compose.yml           # Local development environment
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # GitHub Actions pipeline
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                  # AWS resources
│   ├── variables.tf
│   └── outputs.tf
├── kubernetes/                  # Container orchestration
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── configmap.yaml
├── monitoring/                  # Observability
│   ├── prometheus.yml
│   ├── grafana-dashboard.json
│   └── docker-compose.monitoring.yml
├── logging/                     # Centralized logging
│   ├── logstash.conf
│   ├── elasticsearch.yml
│   └── kibana.yml
└── docs/                        # Documentation
    ├── CONCEPTS.md              # DevOps concepts explained
    ├── SETUP.md                 # Setup instructions
    └── DEPLOYMENT.md            # Deployment guide
```

## 🎯 Core DevOps Concepts Covered

1. **Containerization** - Docker & Docker Compose
2. **CI/CD** - Automated testing and deployment
3. **Infrastructure as Code** - Terraform
4. **Container Orchestration** - Kubernetes
5. **Monitoring & Alerting** - Prometheus & Grafana
6. **Centralized Logging** - ELK Stack
7. **Configuration Management** - Environment configs
8. **Version Control** - Git workflows
9. **Security** - Secrets management
10. **Scalability** - Load balancing & auto-scaling

## 🚀 Quick Start

### Local Development
```bash
docker-compose up -d
curl http://localhost:3000/api/todos
```

### Deploy to Kubernetes
```bash
kubectl apply -f kubernetes/
kubectl port-forward svc/todo-api 3000:3000
```

### View Monitoring
```bash
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001 (admin/admin)
# Kibana: http://localhost:5601
```

## 📚 Learning Path

1. Start with `docs/CONCEPTS.md` - Understand each DevOps concept
2. Review `app/` - Understand the application
3. Explore `docker-compose.yml` - Local development setup
4. Study `.github/workflows/ci-cd.yml` - CI/CD pipeline
5. Review `terraform/` - Infrastructure provisioning
6. Explore `kubernetes/` - Container orchestration
7. Check `monitoring/` and `logging/` - Observability

## 🔧 Prerequisites

- Docker & Docker Compose
- kubectl (for Kubernetes)
- Terraform (for IaC)
- Git
- Node.js (for local development)

## 📖 Documentation

- [DevOps Concepts](docs/CONCEPTS.md) - Detailed explanations
- [Setup Guide](docs/SETUP.md) - Installation and configuration
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment procedures

---

**This project is designed for learning. Each component is simplified for clarity while maintaining real-world practices. Happy Coding**