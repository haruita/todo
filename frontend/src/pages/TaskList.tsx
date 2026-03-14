import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  
  const loadTasks = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tasks');
      if (!res.ok) throw new Error('Error en la red');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTasks(prev => prev.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Mis tareas</h2>
        <button onClick={() => navigate('/new')}>+ Nueva tarea</button>
      </div>

      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}