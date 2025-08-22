export const getAuthToken = () => localStorage.getItem("token");

export const getUserRole = () => localStorage.getItem("role");

export const isAuthenticated = () => !!getAuthToken();

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
