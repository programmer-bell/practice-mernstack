import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import { logout } from './api/auth';
import { AuthContext } from './context/AuthContext';
import TodoListPage from './pages/Todos/TodoListPage';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out successfully');
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-900"
          >
            Logout
          </button>
        )}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected Route */}
          <Route 
            path="/todos"
            element={<PrivateRoute element={<TodoListPage />} />}
          />
          {/* Add more routes for authenticated users here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
