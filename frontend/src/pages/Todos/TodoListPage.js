import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api/todos';
import TodoList from '../../components/Todos/TodoList';
import AddTodoForm from '../../components/Todos/AddTodoForm'; // Import AddTodoForm

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo._id === updatedTodo._id ? updatedTodo : todo
    ));
  };

  const handleDeleteTodo = (deletedTodoId) => {
    setTodos(todos.filter(todo => todo._id !== deletedTodoId));
  };

  const handleAddTodo = (newTodo) => { // Function to handle adding a new todo
    setTodos([...todos, newTodo]); // Add the new todo to the end of the list
  };

  if (loading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error fetching todos: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <AddTodoForm onAdd={handleAddTodo} /> {/* Render AddTodoForm and pass onAdd prop */}
      <TodoList todos={todos} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
    </div>
  );
}

export default TodoListPage;
