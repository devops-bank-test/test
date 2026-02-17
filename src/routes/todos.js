const express = require('express');
const router = express.Router();

// In-memory todos array
let todos = [];
let nextId = 1;

// Validation helper
const validateTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Title is required and must be a string' };
  }
  if (title.trim().length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }
  if (title.length > 255) {
    return { valid: false, error: 'Title must be 255 characters or less' };
  }
  return { valid: true };
};

// GET /api/todos - Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// POST /api/todos - Create a new todo
router.post('/', (req, res) => {
  const { title, completed } = req.body;
  
  const validation = validateTitle(title);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  
  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: completed === true,
    createdAt: new Date().toISOString()
  };
  
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  if (title !== undefined) {
    const validation = validateTitle(title);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    todo.title = title.trim();
  }
  
  if (completed !== undefined) {
    todo.completed = completed === true;
  }
  
  todo.updatedAt = new Date().toISOString();
  res.json(todo);
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});

module.exports = router;
