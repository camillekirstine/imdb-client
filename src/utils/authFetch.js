/**
 * Wrapper around fetch that handles authentication errors
 * Automatically clears auth data and redirects to login on 401
 */
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("authToken");

  // Add authorization header if token exists
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized - token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/user/login?expired=true";
    throw new Error("Authentication expired. Please log in again.");
  }

  return response;
}
