import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '../../api/axiosInstance';
import { setLocalItem } from '../../localStorage';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');  // New Role selection state
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const signinData = { email, password, role };
    console.log('Signin Data:', signinData);
    try {
      const data = await postRequest("auth/signin",signinData);
      const token = data?.data?.token;
      const userDetails = data?.data?.userData;
      const username = userDetails?.name;
      setLocalItem("token", { token });
      setLocalItem("username", { name:username });
      setLocalItem("userdetails", userDetails);
      navigate("/");
    } catch (error) {
       console.log(error);
    }
   

    // Mock authentication for demonstration
    // if (role === 'doctor') {
    //   navigate('/doctor-dashboard');  // Redirect to Doctor Dashboard with appointments
    // } else {
    //   navigate('/user-dashboard');  // Redirect to User Dashboard
    // }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSignin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {/* Email */}
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

        {/* Password */}
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

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Login as</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">student</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Submit Button */}
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
