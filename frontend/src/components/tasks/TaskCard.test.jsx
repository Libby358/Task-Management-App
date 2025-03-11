import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    dueDate: '2025-03-15',
    priority: 'medium',
    completed: false
  };

  const mockHandlers = {
    onComplete: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  test('renders task information correctly', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test task')).toBeInTheDocument();
    expect(screen.getByText('Due: Mar 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  test('calls onComplete when checkbox is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onComplete).toHaveBeenCalledWith('1');
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTask);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  });

  test('renders completed task with strikethrough style', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskCard task={completedTask} {...mockHandlers} />);
    
    const titleElement = screen.getByText('Test Task');
    expect(titleElement).toHaveClass('line-through');
  });
});