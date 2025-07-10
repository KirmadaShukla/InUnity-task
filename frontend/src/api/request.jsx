import axios from "./axiosConfig";

export const get = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

export const patch = async (url, data = {}, config = {}) => {
  try {
    const response = await axios.patch(url, data, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

// --- API functions for groups and goals ---

export const getGroups = (token) =>
  get('/groups', { headers: { Authorization: `Bearer ${token}` } });

export const getMyGroups = (token) =>
  get('/groups/my', { headers: { Authorization: `Bearer ${token}` } })
export const createGroup = (groupData, token) =>
  post('/groups', groupData, { headers: { Authorization: `Bearer ${token}` } });

export const joinGroup = (groupId, token) =>
  post(`/groups/join/${groupId}`, {}, { headers: { Authorization: `Bearer ${token}` } });

export const getGoals = (token) =>
  get('/goals', { headers: { Authorization: `Bearer ${token}` } });

export const addGoal = (goalData, token) =>
  post('/goals', goalData, { headers: { Authorization: `Bearer ${token}` } });

export const updateGoal = (goalId, goalData, token) =>
  patch(`/goals/${goalId}`, goalData, { headers: { Authorization: `Bearer ${token}` } });

export const getGroupMembers = (groupId, token) =>
  get(`/groups/${groupId}/members`, { headers: { Authorization: `Bearer ${token}` } });

// --- functions for auth ---

export const login = (credentials) =>
  post('/auth/login', credentials);

export const register = (userData) =>
  post('/auth/register', userData); 