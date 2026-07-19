import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3000', 
    withCredentials: true // tells the browser to send your httpOnly refresh cookie!
});

// 1. Request Interceptor: Attach the access token to every outgoing request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('aessToken'); // Note: using your spelling
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Response Interceptor: Catch 401s and refresh
api.interceptors.response.use(
    (response) => response, // If the request succeeds, just return it
    
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 (Unauthorized) and we haven't already retried...
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark as retried to prevent infinite loops

            try {
                // Call your Express backend to rotate the token
                // Because withCredentials is true, the httpOnly refresh cookie is sent automatically!
                const response = await axios.get('http://localhost:3000/api/auth/rotate_token', {
                    withCredentials: true 
                });

                // Assuming your backend sends back { acessToken: "new_token_here" }
                const newAccessToken = response.data.acessToken;

                // Save the new token to localStorage
                localStorage.setItem('acessToken', newAccessToken);

                // Update the original failed request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Retry the original request!
                return api(originalRequest);
                
            } catch (refreshError) {
                // If the refresh token itself is expired or invalid, log the user out
                console.error("Refresh token expired. Logging out.");
                localStorage.removeItem('acessToken');
                window.location.href = '/login'; // Force redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;