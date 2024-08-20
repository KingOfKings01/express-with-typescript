import express from 'express';
import todosRouters from './routes/todos'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json())
app.use(todosRouters)

app.listen(3000);