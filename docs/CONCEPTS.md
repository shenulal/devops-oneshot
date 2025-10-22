# DevOps Core Concepts Explained

## 1. Containerization (Docker)

**What is it?**
Containerization packages your application and all its dependencies into a single unit called a container.

**Why use it?**
- **Consistency**: "It works on my machine" problem is solved
- **Isolation**: Each container runs independently
- **Portability**: Run anywhere - laptop, server, cloud

**In this project:**
- `app/Dockerfile` - Defines how to build the container image
- Multi-stage build - Reduces image size by separating build and runtime
- Non-root user - Security best practice
- Health checks - Kubernetes knows if container is healthy

**Key concepts:**
- **Image**: Blueprint (like a class)
- **Container**: Running instance (like an object)
- **Registry**: Storage for images (like Docker Hub, GitHub Container Registry)

---

## 2. Docker Compose

**What is it?**
Tool to define and run multi-container applications locally.

**Why use it?**
- Define entire stack in one file
- Easy local development
- Mimics production environment

**In this project:**
- `docker-compose.yml` - Defines API, PostgreSQL, Prometheus, Grafana
- Services communicate via network
- Volumes persist data
- Health checks ensure dependencies are ready

---

## 3. CI/CD Pipeline (GitHub Actions)

**What is it?**
Automated process to test, build, and deploy code.

**Why use it?**
- Catch bugs early
- Consistent deployments
- Reduce manual errors

**Pipeline stages:**
1. **Test** - Run linter, unit tests
2. **Build** - Create Docker image
3. **Security** - Scan for vulnerabilities
4. **Deploy** - Push to staging/production

**In this project:**
- `.github/workflows/ci-cd.yml` - Runs on every push/PR
- Tests run in parallel with PostgreSQL
- Docker image built and pushed to registry
- Security scanning with Trivy

---

## 4. Infrastructure as Code (Terraform)

**What is it?**
Define cloud infrastructure using code instead of clicking UI.

**Why use it?**
- Version control for infrastructure
- Reproducible environments
- Easy to scale and modify

**In this project:**
- `terraform/main.tf` - AWS VPC, subnets, security groups, RDS
- `terraform/variables.tf` - Configurable parameters
- Creates entire network and database infrastructure

**Key resources:**
- VPC - Virtual network
- Subnets - Network segments
- Security Groups - Firewall rules
- RDS - Managed PostgreSQL database

---

## 5. Container Orchestration (Kubernetes)

**What is it?**
Automatically manages containerized applications across clusters.

**Why use it?**
- Auto-scaling based on load
- Self-healing (restarts failed containers)
- Rolling updates (zero downtime deployments)
- Load balancing

**In this project:**
- `kubernetes/deployment.yaml` - Defines 3 replicas, resource limits, health checks
- `kubernetes/service.yaml` - Exposes API, ConfigMap, Secrets, HPA
- `kubernetes/ingress.yaml` - External access, SSL/TLS

**Key concepts:**
- **Pod**: Smallest unit (usually one container)
- **Deployment**: Manages pods, ensures desired state
- **Service**: Stable network endpoint
- **Ingress**: External HTTP/HTTPS access
- **ConfigMap**: Non-sensitive configuration
- **Secret**: Sensitive data (passwords, tokens)
- **HPA**: Auto-scales based on metrics

---

## 6. Monitoring (Prometheus & Grafana)

**What is it?**
Collect metrics and visualize system health.

**Why use it?**
- Detect issues before users notice
- Understand performance
- Capacity planning

**In this project:**
- Application exposes metrics at `/metrics`
- Prometheus scrapes metrics every 15 seconds
- Grafana visualizes in dashboards
- Alerts trigger on thresholds

**Key metrics:**
- `http_requests_total` - Total requests
- `http_request_duration_seconds` - Response time
- CPU/Memory usage
- Error rates

---

## 7. Centralized Logging (ELK Stack)

**What is it?**
Collect, process, and visualize logs from all services.

**Why use it?**
- Find issues across services
- Historical analysis
- Debugging production issues

**Components:**
- **Elasticsearch**: Stores logs
- **Logstash**: Processes and forwards logs
- **Kibana**: Visualizes logs

---

## 8. Configuration Management

**What is it?**
Manage different configurations for different environments.

**Why use it?**
- Same code, different configs
- Secrets stay secure
- Easy environment switching

**In this project:**
- Environment variables in `.env`
- Kubernetes ConfigMap for non-sensitive data
- Kubernetes Secrets for passwords
- Terraform variables for infrastructure

---

## 9. Security Best Practices

**In this project:**
- Non-root user in containers
- Read-only root filesystem
- Resource limits
- Network policies
- Secrets management
- Security scanning in CI/CD

---

## 10. Scalability & High Availability

**In this project:**
- Kubernetes HPA auto-scales pods
- Multiple replicas for redundancy
- Pod anti-affinity spreads across nodes
- Health checks ensure only healthy pods receive traffic
- Rolling updates for zero-downtime deployments

---

## DevOps Workflow

```
Code Push → GitHub
    ↓
CI/CD Pipeline (Test, Build, Security)
    ↓
Docker Image → Registry
    ↓
Deploy to Kubernetes
    ↓
Monitoring & Logging
    ↓
Alerts on Issues
```

---

## Key Takeaways

1. **Containerization** ensures consistency
2. **CI/CD** automates quality checks
3. **IaC** makes infrastructure reproducible
4. **Orchestration** manages scale and reliability
5. **Monitoring** provides visibility
6. **Logging** helps debugging
7. **Security** is built-in, not added later
8. **Automation** reduces manual errors

