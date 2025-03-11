import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, loading: false, tasks: action.payload };
    case 'FETCH_TASKS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TASK_SUCCESS':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: 'FETCH_TASKS_REQUEST' });
    try {
      const data = await getTasks();
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: newTask });
      return newTask;
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      throw error;
    }
  };

  const editTask = async (taskData) => {
    try {
      const updatedTask = await updateTask(taskData.id, taskData);
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: updatedTask });
      return updatedTask;
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      throw error;
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      throw error;
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      await editTask({ ...task, completed: !task.completed });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);