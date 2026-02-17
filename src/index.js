const express = require('express');
const todosRouter = require('./routes/todos');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API Routes
app.use('/api/todos', todosRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
