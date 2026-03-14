import { useNavigate } from 'react-router-dom';

interface TaskProps {
    task: {
        id: number;
        title: string;
        description: string;
        completed: boolean;
    };
    onDelete: (id: number) => void;
}

export default function TaskItem({ task, onDelete }: TaskProps) {
    const navigate = useNavigate();

    return (
        <div style={{ border: '1px solid #444', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            <h3>{task.title} {task.completed ? '✅' : '⏳'}</h3>
            <p>{task.description}</p>

            <button onClick={() => navigate(`/edit/${task.id}`)}>
                Editar
            </button>

            <button
                onClick={() => onDelete(task.id)}
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}
            >
                Eliminar
            </button>
        </div>
    );
}