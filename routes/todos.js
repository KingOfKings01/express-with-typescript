"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
const todos = [];
route.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
route.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    res.status(200).json({ todos: newTodo });
});
route.delete('/todo/:id', (req, res, next) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id);
    if (todoIndex === -1) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: 'Todo deleted' });
});
route.put('/todo/:id', (req, res, next) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id);
    if (todoIndex === -1) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    todos[todoIndex].text = req.body.text;
    res.status(200).json({ todos: todos[todoIndex] });
});
exports.default = route;
