import React from 'react';
//import { format } from 'date-fns';

function TaskCard({ task, onComplete, onEdit, onDelete }) {
  return (
    <div className={`p-4 rounded-lg shadow mb-3 ${task.completed ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onComplete(task.id)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="ml-3">
            <h3 className={`text-md font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="mt-2 flex items-center text-xs text-gray-500">
        {task.dueDate && (
          <span className="mr-3">
            Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </span>
        )}
        {task.priority && (
          <span className={`px-2 py-1 rounded-full ${
            task.priority === 'high' ? 'bg-red-100 text-red-800' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {task.priority}
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;