import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-app-react-server.vercel.app/api/v2/todo"
});
// "https://long-pink-termite-tie.cyclic.app/api/v2/todo"
//http://localhost:3000/api/v2/todo
//https://todo-app-react-server.vercel.app/
// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessTokenUser");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
