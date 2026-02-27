import axios from "axios";

const api = axios.create({
    baseURL: "https://cloth-ecommerce-server.vercel.app",
});

// 🔐 interceptor (এটাই main security)
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("access-token");
//         if (token) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
