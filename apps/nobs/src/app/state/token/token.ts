export const setToken = (token) => localStorage.setItem('token', token);
export const retrieveToken = () => localStorage.getItem('token');
export const deleteToken = () => localStorage.removeItem('token');