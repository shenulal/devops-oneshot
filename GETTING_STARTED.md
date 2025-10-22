# Getting Started with DevOps One-Shot

Welcome! This guide will help you get started with the complete DevOps learning project.

---

## 🎯 What is This Project?

A **complete, production-ready DevOps project** that teaches all core concepts through a single practical example:

- **Simple Todo API** (Node.js)
- **Containerized** with Docker
- **Automated** with CI/CD
- **Orchestrated** with Kubernetes
- **Monitored** with Prometheus & Grafana
- **Logged** with ELK Stack
- **Provisioned** with Terraform

---

## ⏱️ Time Commitment

- **Quick Demo**: 15 minutes
- **Local Setup**: 30 minutes
- **Full Learning**: 8-12 hours
- **Mastery**: 20+ hours

---

## 🚀 Quick Start (5 minutes)

### 1. Prerequisites
```bash
# Check if you have Docker
docker --version
docker-compose --version
```

### 2. Start Services
```bash
docker-compose up -d
```

### 3. Access Services
- **API**: http://localhost:3000
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)

### 4. Test API
```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/todos
```

### 5. Stop Services
```bash
docker-compose down
```

---

## 📚 Learning Paths

### 🟢 Beginner Path (2-3 hours)

**Goal**: Understand basic DevOps concepts

1. **Read** [README.md](README.md) (5 min)
2. **Read** [docs/CONCEPTS.md](docs/CONCEPTS.md) (30 min)
3. **Setup** [docs/SETUP.md](docs/SETUP.md) (15 min)
4. **Run** `docker-compose up -d` (5 min)
5. **Explore** the application (30 min)
6. **Reference** [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) (15 min)

**What you'll learn:**
- What is containerization?
- What is CI/CD?
- What is monitoring?
- How do these work together?

---

### 🟡 Intermediate Path (4-6 hours)

**Goal**: Deploy and manage applications

1. **Complete** Beginner path
2. **Study** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) (30 min)
3. **Review** application code in `app/src/` (30 min)
4. **Understand** `docker-compose.yml` (20 min)
5. **Study** `.github/workflows/ci-cd.yml` (30 min)
6. **Deploy** to Kubernetes (minikube) (60 min)
7. **Modify** code and trigger CI/CD (60 min)

**What you'll learn:**
- How to containerize applications
- How to set up CI/CD pipelines
- How to deploy to Kubernetes
- How to monitor applications

---

### 🔴 Advanced Path (8+ hours)

**Goal**: Master production DevOps

1. **Complete** Intermediate path
2. **Study** `terraform/` - Infrastructure as Code (90 min)
3. **Review** `kubernetes/` manifests (60 min)
4. **Deploy** to AWS with Terraform (90 min)
5. **Configure** monitoring dashboards (60 min)
6. **Test** auto-scaling (45 min)
7. **Practice** disaster recovery (60 min)
8. **Optimize** performance and costs (60 min)

**What you'll learn:**
- Infrastructure as Code
- Advanced Kubernetes
- Production monitoring
- Disaster recovery
- Cost optimization

---

## 📖 Documentation Map

```
START HERE
    ↓
README.md (Project overview)
    ↓
Choose your path:
    ├─ Beginner → CONCEPTS.md → SETUP.md → QUICK_REFERENCE.md
    ├─ Intermediate → ARCHITECTURE.md → DEPLOYMENT.md
    └─ Advanced → Terraform → Kubernetes → Monitoring
```

---

## 🗂️ File Organization

### Core Files
- **README.md** - Start here
- **INDEX.md** - Complete file index
- **GETTING_STARTED.md** - This file

### Documentation
- **docs/CONCEPTS.md** - 10 DevOps concepts explained
- **docs/SETUP.md** - Installation guide
- **docs/DEPLOYMENT.md** - Deployment procedures
- **docs/ARCHITECTURE.md** - System design
- **docs/QUICK_REFERENCE.md** - Commands and APIs
- **docs/PROJECT_SUMMARY.md** - Project overview

### Application
- **app/src/server.js** - Express API
- **app/Dockerfile** - Container definition
- **app/package.json** - Dependencies

### Infrastructure
- **docker-compose.yml** - Local development
- **terraform/** - AWS infrastructure
- **kubernetes/** - Container orchestration
- **monitoring/** - Prometheus config
- **.github/workflows/ci-cd.yml** - CI/CD pipeline

---

## 🎓 What You'll Learn

### Containerization
- How Docker works
- Multi-stage builds
- Health checks
- Security best practices

### CI/CD
- Automated testing
- Docker image building
- Security scanning
- Automated deployment

### Infrastructure as Code
- Terraform basics
- AWS resources
- VPC and networking
- Database provisioning

### Kubernetes
- Deployments and replicas
- Services and networking
- ConfigMaps and Secrets
- Auto-scaling (HPA)
- Rolling updates

### Monitoring
- Prometheus metrics
- Grafana dashboards
- Alert configuration
- Performance tracking

### Logging
- Centralized logging
- Log aggregation
- Log analysis
- Troubleshooting

---

## 💻 System Requirements

### Minimum
- 4GB RAM
- 10GB disk space
- Docker & Docker Compose

### Recommended
- 8GB RAM
- 20GB disk space
- Docker, kubectl, Terraform

### Optional
- AWS account (for Terraform)
- GitHub account (for CI/CD)

---

## 🔧 Installation

### macOS
```bash
brew install docker docker-compose git node kubectl terraform
```

### Ubuntu/Debian
```bash
sudo apt-get install docker.io docker-compose git nodejs kubectl terraform
```

### Windows
- Download Docker Desktop
- Download Git
- Download Node.js
- Download kubectl, terraform

---

## ✅ Verification

### Check Docker
```bash
docker --version
docker-compose --version
```

### Check Git
```bash
git --version
```

### Check Node.js (optional)
```bash
node --version
npm --version
```

---

## 🚦 Next Steps

### Immediate (Next 5 minutes)
1. Run `docker-compose up -d`
2. Visit http://localhost:3000
3. Check http://localhost:3001 (Grafana)

### Short Term (Next 30 minutes)
1. Read [README.md](README.md)
2. Read [docs/CONCEPTS.md](docs/CONCEPTS.md)
3. Explore the application code

### Medium Term (Next 2-3 hours)
1. Follow [docs/SETUP.md](docs/SETUP.md)
2. Deploy to local Kubernetes
3. Modify code and trigger CI/CD

### Long Term (Next 8+ hours)
1. Study [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. Deploy to AWS with Terraform
3. Configure monitoring and logging
4. Practice scaling and failover

---

## 🆘 Troubleshooting

### Docker won't start
```bash
# Check if Docker is running
docker ps

# Restart Docker
# macOS: Click Docker icon
# Linux: sudo systemctl restart docker
# Windows: Restart Docker Desktop
```

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Can't access services
```bash
# Check if containers are running
docker-compose ps

# Check logs
docker-compose logs api
```

### Need help?
1. Check [docs/SETUP.md](docs/SETUP.md)
2. Check [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)
3. Review logs: `docker-compose logs`

---

## 📞 Support Resources

- **Concepts**: [docs/CONCEPTS.md](docs/CONCEPTS.md)
- **Setup Issues**: [docs/SETUP.md](docs/SETUP.md)
- **Deployment**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Commands**: [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)
- **File Index**: [INDEX.md](INDEX.md)

---

## 🎯 Success Criteria

You'll know you're successful when you can:

✅ Run the project locally with Docker Compose  
✅ Understand each DevOps component  
✅ Deploy to Kubernetes  
✅ Trigger CI/CD pipeline  
✅ View metrics in Grafana  
✅ Understand Terraform configuration  
✅ Troubleshoot issues using logs  
✅ Scale applications  
✅ Implement monitoring  
✅ Explain DevOps concepts to others  

---

## 🚀 Ready to Start?

### Option 1: Quick Demo (5 min)
```bash
docker-compose up -d
# Visit http://localhost:3000
```

### Option 2: Full Learning (2-3 hours)
1. Read [README.md](README.md)
2. Read [docs/CONCEPTS.md](docs/CONCEPTS.md)
3. Follow [docs/SETUP.md](docs/SETUP.md)
4. Explore the project

### Option 3: Deep Dive (8+ hours)
Follow the Advanced path above

---

**Choose your path and start learning! 🎓**

Questions? Check the documentation or review the code!

