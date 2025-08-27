import React, { useState } from 'react';
import { createTodo } from '../../api/todos'; // Import createTodo

function AddTodoForm({ onAdd }) { // Receive onAdd function as a prop
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await createTodo(formData); // Call createTodo API
      console.log('New todo created:', newTodo);
      onAdd(newTodo); // Call onAdd to add the new todo to the state in the parent component
      setFormData({ title: '', description: '' }); // Clear the form
    } catch (error) {
      console.error('Error creating todo:', error);
      // TODO: Display error message to the user
    }
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md"> {/* Add some basic styling */}
      <h3 className="text-xl font-semibold mb-2">Add New Todo</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Todo Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Todo Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodoForm;
