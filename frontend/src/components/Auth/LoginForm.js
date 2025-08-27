import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log('Login successful:', response);
      setIsLoggedIn(true);
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Display error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                     name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                     name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
              <Link to="/register" className="text-sm text-blue-600 hover:underline">Don't have an account? Register here.</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
