import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
  withCredentials: true, // This is important for sending cookies with requests
});
