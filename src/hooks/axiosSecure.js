import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    await axiosSecure.post("/auth/refresh-token");
    startTokenRefreshTimer(7200);
  } catch {
    throw new Error("Refresh token expired or invalid");
  }
};

// Interceptor to handle token refresh
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosSecure(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const startTokenRefreshTimer = (expiresIn) => {
  setTimeout(async () => {
    try {
      await refreshToken();
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }, (expiresIn - 60) * 1000);
};

export { axiosSecure, startTokenRefreshTimer };
