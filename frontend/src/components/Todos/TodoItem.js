import React from 'react';
import { updateTodo, deleteTodo } from '../../api/todos'; // Import deleteTodo

function TodoItem({ todo, onUpdate, onDelete }) { // Receive onDelete function as a prop
  const handleMarkCompleted = async () => {
    try {
      const updatedTodo = await updateTodo(todo._id, { ...todo, completed: !todo.completed });
      console.log('Todo updated:', updatedTodo);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      // TODO: Display error message to the user
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id); // Call deleteTodo API
      console.log('Todo deleted:', todo._id);
      onDelete(todo._id); // Call onDelete to remove the todo from the state in the parent component
    } catch (error) {
      console.error('Error deleting todo:', error);
      // TODO: Display error message to the user
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-md ${todo.completed ? 'line-through text-gray-500' : ''}`}>
      <div>
        <h3 className="text-lg font-semibold">{todo.title}</h3>
        <p className="text-gray-600">{todo.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleMarkCompleted}
          className={`px-4 py-2 rounded ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white" // Styling for delete button
        >
          Delete
        </button>
        {/* Add button for Edit here later */}
      </div>
    </div>
  );
}

export default TodoItem;
