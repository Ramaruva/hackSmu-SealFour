import axios from 'axios';

// Signup request
export const signup = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
  return response.data.success;
};

// Signin request
export const signin = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/auth/signin', credentials);
  return response.data.token;
};
