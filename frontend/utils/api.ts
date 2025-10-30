import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000",
  withCredentials: false
});

// Intercepteur pour journaliser les erreurs réseau côté frontend.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API LexaIA", error);
    return Promise.reject(error);
  }
);

export default api;
