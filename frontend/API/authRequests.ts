import axios from 'axios';


const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL 

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
    return response.status === 201 ? response.data : null;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, userData);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};