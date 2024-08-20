import { Router } from 'express'; 
import { Todo } from '../models/todo'

const route = Router()

const todos: Todo[] = []

route.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
})

route.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }
    res.status(200).json({todos: newTodo})
})

route.delete('/todo/:id', (req, res, next) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id)
    if (todoIndex === -1) {
        res.status(404).json({message: 'Todo not found'})
        return
    }
    todos.splice(todoIndex, 1)
    res.status(200).json({message: 'Todo deleted'})
})

route.put('/todo/:id', (req, res, next) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id)
    if (todoIndex === -1) {
        res.status(404).json({message: 'Todo not found'})
        return
    }
    todos[todoIndex].text = req.body.text
    res.status(200).json({todos: todos[todoIndex]})
})

export default route