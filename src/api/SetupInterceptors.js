import AsyncStorage from '@react-native-async-storage/async-storage';

export const SetupInterceptors = (apiClient) => {
  // Request Interceptor: Attach Token
  apiClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handle 401 and Errors
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!error.response) {
        console.error("Network error:", error);
        return Promise.reject(error);
      }
      
      const status = error.response.status;

      if (status === 401 || status === 403 || status === 500 || status === 400) {
        logout();
      }

      return Promise.reject(error);
    }
  );

  // **Logout and Redirect to Login**
  const logout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("appUser");

    // Redirect to login screen
    window.location.href = "/login";
  };
};
