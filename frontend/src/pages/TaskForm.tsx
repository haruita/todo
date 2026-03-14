import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetch(`http://localhost:3000/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setCompleted(data.completed);
                });
        }
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const taskData = { title, description, completed };
        const url = isEditing ? `http://localhost:3000/api/tasks/${id}` : 'http://localhost:3000/api/tasks';
        const method = isEditing ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        navigate('/');
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                    required
                />
                <br /><br />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                    required
                />
                <br /><br />
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    Completada
                </label>
                <br /><br />

                <button type="submit">
                    {isEditing ? 'Guardar cambios' : 'Crear'}
                </button>

                <button type="button" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}