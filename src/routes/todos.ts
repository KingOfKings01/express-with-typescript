
import { Router } from 'express'; 
import { Todo } from '../models/todo'
const route = Router()

type RequestBody = {text : string}
type RequestParams = { id : string }

const todos: Todo[] = []

route.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
})

route.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo)

    res.status(200).json({todos: newTodo})
})

route.delete('/todo/:id', (req, res, next) => {
    const params = req.params as RequestParams
    const todoIndex = todos.findIndex(todo => todo.id === params.id)
    if (todoIndex === -1) {
        res.status(404).json({message: 'Todo not found'})
        return
    }
    todos.splice(todoIndex, 1)
    res.status(200).json({message: 'Todo deleted'})
})

route.put('/todo/:id', (req, res, next) => {
        const body =  req.body as RequestBody
        const params = req.params as RequestParams
        const todoIndex = todos.findIndex(todo => todo.id === params.id)
        if (todoIndex === -1) {
            res.status(404).json({message: 'Todo not found'})
            return
        }
        todos[todoIndex].text = body.text
        res.status(200).json({todos: todos[todoIndex]})
})

export default route