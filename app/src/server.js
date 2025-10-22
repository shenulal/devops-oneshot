const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('prom-client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Prometheus metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
    httpRequestTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', environment: ENV, timestamp: new Date().toISOString() });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// API Routes
app.get('/api/todos', (req, res) => {
  // Mock data for demonstration
  const todos = [
    { id: 1, title: 'Learn Docker', completed: true },
    { id: 2, title: 'Learn Kubernetes', completed: false },
    { id: 3, title: 'Learn Terraform', completed: false }
  ];
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = {
    id: Math.floor(Math.random() * 1000),
    title,
    completed: false
  };
  res.status(201).json(newTodo);
});

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = {
    id: parseInt(id),
    title: `Todo ${id}`,
    completed: false
  };
  res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const updatedTodo = {
    id: parseInt(id),
    title: title || `Todo ${id}`,
    completed: completed || false
  };
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Todo ${id} deleted` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`[${ENV}] Todo API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Metrics: http://localhost:${PORT}/metrics`);
});

module.exports = app;

