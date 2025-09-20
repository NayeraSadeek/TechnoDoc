import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Laravel backend

// Register Patient
export const registerPatient = async (data) => {
  return await axios.post(`${API_URL}/patient/register`, data);
};

// Register Doctor
export const registerDoctor = async (data) => {
  return await axios.post(`${API_URL}/doctor/register`, data);
};

// Login
export const login = async (data) => {
  return await axios.post(`${API_URL}/login`, data);
};
