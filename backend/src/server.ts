import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

let tasks: Task[] = [
    {
        id: 0,
        title: 'Mi primera tarea',
        description: '¡Los saludo desde el backend!',
        completed: true,
        createdAt: Date.now().toString()
    }
];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const newTask = {
        id: maxId + 1,
        ...req.body,
        createdAt: Date.now().toString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/api/tasks/:id', (req, res) => {
    const auxId = parseInt(req.params.id);
    const taskFound = tasks.find((t) => t.id === auxId);
    if (!taskFound) return res.status(404).json({ message: "Task not found." });
    res.json(taskFound);
});

app.put('/api/tasks/:id', (req, res) => {
    const auxId = parseInt(req.params.id);
    const taskExists = tasks.some((t) => t.id === auxId);
    if (!taskExists) return res.status(404).json({ message: "Task not found." });

    tasks = tasks.map((t) =>
        t.id === auxId ? { ...t, ...req.body, id: auxId } : t
    );
    res.json(tasks.find(t => t.id === auxId));
});

app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    res.sendStatus(204);
});

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});