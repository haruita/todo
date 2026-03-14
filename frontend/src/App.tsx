import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;