import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    console.log('Signin Data:', { email, password });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSignin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Sign In
        </button>

        {/* Link to Sign Up Page */}
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
