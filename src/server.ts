import express from 'express';
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface Task {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    createdAt: string
}

let tasks: Task[] = [
    {
        id: 0,
        title: 'Mi primera nota',
        description: '¡Los saludo desde el backend!',
        completed: true,
        createdAt: Date.now().toString()
    }
];

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Esta es una aplicación para tomar notas.');
})

// GET
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
})

// POST
app.post('/api/tasks', (req, res) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const newTask = ({
        id: maxId + 1,
        ...req.body,
        createdAt: Date.now().toString()
    });
    tasks.push(newTask);
    res.send(newTask);
})

// GET:id
app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    if (!id) return res.sendStatus(404).json({
        message: "ID not provided."
    })

    const auxId = parseInt(id);
    const taskFound = tasks.find((t) => t.id === auxId);

    if (!taskFound) return res.status(404).json({
        message: "Task not found."
    })

    res.send(taskFound);
})

// PUT:id
app.put('/api/tasks/:id', (req, res) => {
    const newData = req.body;
    const { id } = req.params;
    

    if (!id) return res.sendStatus(404).json({
        message: "ID not provided."
    })
    
    const auxId = parseInt(id);
    const taskExists = tasks.some((t) => t.id === auxId);

    if (!taskExists) {
        return res.status(404).json({ message: "Task not found." });
    }
    
    tasks = tasks.map((t) =>
        t.id === auxId ? { ...t, ...newData, id: auxId } : t
    );

    const updatedTask = tasks.find(t => t.id === auxId);
    res.json(updatedTask);
})

// DELETE:id
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    if (!id) return res.sendStatus(404).json({
        message: 'ID not provided.'
    })

    const auxId = parseInt(id);
    const taskFound = tasks.find((t) => t.id === auxId);

    if (!taskFound)
        return res.status(404).json({
            message: "Task not found."
        })

    tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    res.sendStatus(204);
})

// 404
app.use((req, res) => {
    res.status(404).send('No se encontró el recurso.');
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}.`);
});