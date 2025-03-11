// src/pages/TaskListPage.jsx
import React, { useState } from 'react';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/common/Modal';
import { useTasks } from '../contexts/TaskContext';

function TaskListPage() {
  const { tasks, loading, error, toggleTaskCompletion, addTask, editTask, removeTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await editTask(taskData);
      } else {
        await addTask(taskData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save task:', err);
      // Handle error (could show an error message to the user)
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await removeTask(taskId);
      } catch (err) {
        console.error('Failed to delete task:', err);
        // Handle error
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading tasks...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded-md ${filter === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Click "Add Task" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={toggleTaskCompletion}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default TaskListPage;