import express from 'express';
const {Router} = express
const router  = Router()

// In-memory store for tasks
let tasks = [];
let currentId = 1;

// Basic validation function
const validateTask = (task) => {
    if (!task.title || !task.description) {
        return false;
    }
    return true;
};

// Get all tasks
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// Get a specific task by ID
router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Create a new task
router.post('/', (req, res) => {
    const newTask = {
        id: currentId++,
        title: req.body.title,
        description: req.body.description
    };

    if (!validateTask(newTask)) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update an existing task by ID
router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = {
        id: task.id,
        title: req.body.title || task.title,
        description: req.body.description || task.description
    };

    if (!validateTask(updatedTask)) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
});

// Delete a task by ID
router.delete('/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});
export default router;

