import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup Data:', { name, email, password });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Link to Sign In Page */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
