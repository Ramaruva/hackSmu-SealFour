import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../../api/axiosInstance";
import { setLocalItem } from "../../localStorage";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role as 'user'
  const [specialty, setSpecialty] = useState(""); // For doctors
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const postData ={
         name,email,role,password,specialty
      }
      const data = await postRequest("auth/signup", postData);
      const token = data?.data?.token;
      const userDetails = data?.data?.newUser;
      setLocalItem("token", { token });
      setLocalItem("username", { name });
      setLocalItem("userdetails", userDetails);
      navigate("/");
    } catch (error) {
      alert("Something went wrong please try again!");
    }

    // Send signupData to your backend API to handle the registration
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Name */}
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
          <label className="block mb-2 text-sm text-gray-600">Signup as</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Specialty for Doctor */}
        {role === "doctor" && (
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">
              Specialty
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Enter your specialty (e.g., Mental Health)"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Link to Sign In Page */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
