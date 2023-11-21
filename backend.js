const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TODOS_FILE = path.join(__dirname, 'todos.json');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
};

const readTodosFromFile = async () => {
    try {
        const data = await fs.readFile(TODOS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeTodosToFile = async (todos) => {
    await fs.writeFile(TODOS_FILE, JSON.stringify(todos));
};

app.get('/todos', async (req, res) => {
    try {
        const todos = await readTodosFromFile();
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const todos = await readTodosFromFile();
        const todo = todos.find((t) => t.id === req.params.id);
        if (!todo) {
            res.status(404).send();
        } else {
            res.json(todo);
        }
    } catch (error) {
        next(error);
    }
});

app.post('/todos', async (req, res) => {
    try {
        const newTodo = {
            id: Math.random().toString(36).substring(2, 6),
            title: req.body.title,
            description: req.body.description,
        };

        const todos = await readTodosFromFile();
        todos.push(newTodo);

        await writeTodosToFile(todos);

        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const todos = await readTodosFromFile();
        const todoIndex = todos.findIndex((todo) => todo.id === req.params.id);

        if (todoIndex === -1) {
            res.status(404).send();
        } else {
            const updatedTodo = {
                id: todos[todoIndex].id,
                title: req.body.title,
                description: req.body.description,
            };

            todos[todoIndex] = updatedTodo;
            await writeTodosToFile(todos);

            res.status(200).json(updatedTodo);
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todos = await readTodosFromFile();
        const todoIndex = todos.findIndex((t) => t.id === req.params.id);

        if (todoIndex === -1) {
            res.status(404).send();
        } else {
            todos.splice(todoIndex, 1);
            await writeTodosToFile(todos);

            res.status(200).send();
        }
    } catch (error) {
        next(error);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
    res.status(404).send();
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
