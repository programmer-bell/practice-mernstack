import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onUpdate, onDelete }) { // Receive onDelete prop
  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} /> // Pass onDelete prop to TodoItem
      ))}
    </div>
  );
}

export default TodoList;
