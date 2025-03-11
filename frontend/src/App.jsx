// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import Header from './components/layout/Header';

function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/tasks/:id" element={<TaskDetailsPage />} />
              <Route path="/" element={<Navigate to="/tasks" replace />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;