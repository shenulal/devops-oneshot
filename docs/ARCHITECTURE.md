# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Ingress/ALB   │
                    │  (Load Balancer)│
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
   │  Pod 1  │          │  Pod 2  │          │  Pod 3  │
   │ Todo API│          │ Todo API│          │ Todo API│
   └────┬────┘          └────┬────┘          └────┬────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘

        ┌──────────────────────────────────────┐
        │      MONITORING & OBSERVABILITY      │
        ├──────────────────────────────────────┤
        │  Prometheus  │  Grafana  │  Kibana  │
        │  (Metrics)   │ (Dashboards) (Logs)  │
        └──────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Application Layer
**Todo API (Node.js Express)**
- REST API endpoints for todo management
- Prometheus metrics exposure
- Health check endpoint
- Structured logging

**Location**: `app/src/server.js`

### 2. Data Layer
**PostgreSQL Database**
- Persistent data storage
- Managed by RDS (in production)
- Local Docker container (in development)

**Connection**: Via environment variables

### 3. Container Layer
**Docker**
- Multi-stage build for optimization
- Non-root user for security
- Health checks
- Resource limits

**Location**: `app/Dockerfile`

### 4. Orchestration Layer
**Kubernetes**
- Pod management
- Service discovery
- Load balancing
- Auto-scaling (HPA)
- Rolling updates

**Location**: `kubernetes/`

### 5. Infrastructure Layer
**Terraform**
- VPC and networking
- Security groups
- RDS database
- CloudWatch logs

**Location**: `terraform/`

### 6. CI/CD Layer
**GitHub Actions**
- Automated testing
- Docker image building
- Security scanning
- Deployment automation

**Location**: `.github/workflows/ci-cd.yml`

### 7. Monitoring Layer
**Prometheus**
- Metrics collection
- Time-series database
- Alert evaluation

**Grafana**
- Metrics visualization
- Custom dashboards
- Alert management

**Location**: `monitoring/`

### 8. Logging Layer
**ELK Stack**
- Elasticsearch: Log storage
- Logstash: Log processing
- Kibana: Log visualization

**Location**: `logging/`

---

## Data Flow

### Request Flow
```
User Request
    ↓
Ingress/ALB (Load Balancer)
    ↓
Kubernetes Service
    ↓
Pod (Todo API Container)
    ↓
PostgreSQL Database
    ↓
Response back to User
```

### Metrics Flow
```
Application
    ↓
Prometheus Scrape (/metrics endpoint)
    ↓
Prometheus Storage
    ↓
Grafana Query
    ↓
Dashboard Visualization
```

### Logs Flow
```
Application Logs
    ↓
Logstash Processing
    ↓
Elasticsearch Storage
    ↓
Kibana Visualization
```

---

## Deployment Environments

### Local Development
- Docker Compose
- Single machine
- All services in containers
- Hot reload enabled

### Staging
- Kubernetes cluster
- Multiple replicas
- Monitoring enabled
- Similar to production

### Production
- Kubernetes cluster
- High availability
- Auto-scaling enabled
- Full monitoring and alerting

---

## Security Architecture

### Network Security
- VPC isolation
- Security groups (firewall rules)
- Private subnets for databases
- Public subnets for load balancers

### Container Security
- Non-root user
- Read-only root filesystem
- Resource limits
- Security scanning in CI/CD

### Data Security
- Secrets management (Kubernetes Secrets)
- Encrypted connections (TLS/SSL)
- Database encryption at rest
- Audit logging

### Access Control
- RBAC (Role-Based Access Control)
- Service accounts
- Network policies
- API authentication

---

## Scalability Design

### Horizontal Scaling
- Multiple pod replicas
- Load balancing across pods
- Stateless application design

### Vertical Scaling
- Resource limits and requests
- Pod resource allocation
- Node sizing

### Auto-Scaling
- HPA (Horizontal Pod Autoscaler)
- Metrics-based scaling
- Min/max replica limits

---

## High Availability

### Redundancy
- Multiple replicas (3 minimum)
- Multi-AZ deployment
- Database replication

### Health Checks
- Liveness probes (restart if unhealthy)
- Readiness probes (remove from load balancer if not ready)
- Startup probes (wait for initialization)

### Graceful Shutdown
- Pod disruption budgets
- Termination grace period
- Connection draining

---

## Disaster Recovery

### Backup Strategy
- Database automated backups
- Container image versioning
- Infrastructure as Code (Terraform)

### Recovery Procedures
- Database restore from backup
- Container image rollback
- Infrastructure recreation from Terraform

### RTO/RPO
- RTO (Recovery Time Objective): < 5 minutes
- RPO (Recovery Point Objective): < 1 hour

---

## Performance Optimization

### Caching
- Application-level caching
- Database query optimization
- CDN for static content

### Resource Efficiency
- Multi-stage Docker builds
- Resource limits and requests
- Pod anti-affinity for distribution

### Monitoring
- Performance metrics
- Latency tracking
- Error rate monitoring

---

## Cost Optimization

### Resource Utilization
- Right-sizing instances
- Auto-scaling to match demand
- Spot instances for non-critical workloads

### Infrastructure
- Managed services (RDS)
- Shared resources
- Reserved capacity

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Application | Node.js, Express | API server |
| Database | PostgreSQL | Data persistence |
| Containerization | Docker | Application packaging |
| Orchestration | Kubernetes | Container management |
| Infrastructure | Terraform, AWS | Cloud resources |
| CI/CD | GitHub Actions | Automation |
| Monitoring | Prometheus, Grafana | Metrics & visualization |
| Logging | ELK Stack | Log aggregation |
| Version Control | Git, GitHub | Code management |

---

## Next Steps

1. Review each component in detail
2. Understand the data flow
3. Study the deployment process
4. Practice scaling and failover
5. Implement custom monitoring

