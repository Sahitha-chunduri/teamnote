const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const tokenService = {
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  hasToken: () => {
    return !!localStorage.getItem('authToken');
  }
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Login failed');
      }

      const data = await response.json();
      
      if (data.token) {
        tokenService.setToken(data.token);
      }

      return {
        success: true,
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Signup failed');
      }

      const data = await response.json();

      if (data.token) {
        tokenService.setToken(data.token);
      }

      return {
        success: true,
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Signup failed'
      };
    }
  },

  logout: () => {
    tokenService.removeToken();
    return { success: true };
  }
};

export const apiRequest = async (endpoint, options = {}) => {
  const token = tokenService.getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
  } catch (networkErr) {
    console.error('Network error during API request', networkErr);
    throw new Error('Network error: ' + (networkErr.message || networkErr));
  }

  if (!response.ok) {
    let bodyText = '';
    try {
      bodyText = await response.text();
    } catch (e) {
      bodyText = '';
    }

    const message = bodyText || response.statusText || `HTTP ${response.status}`;

    if (response.status === 401) {
      tokenService.removeToken();
    }

    console.error(`API request failed ${endpoint}:`, response.status, message);
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  return response;
};

export const notesService = {
  getUserNotes: async () => {
    try {
      const response = await apiRequest('/notes/my-notes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  createNote: async (title, description) => {
    try {
      const response = await apiRequest('/notes/create', {
        method: 'POST',
        body: JSON.stringify({ title, description })
      });
      if (!response.ok) throw new Error('Failed to create note');
      return await response.json();
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  deleteNote: async (noteId) => {
    try {
      const response = await apiRequest(`/notes/${noteId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete note');
      return await response.json();
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  shareNote: async (noteId, email, permission) => {
    try {
      const qs = `?email=${encodeURIComponent(email)}&permission=${encodeURIComponent(permission)}`;
      const response = await apiRequest(`/notes/share/${noteId}${qs}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to share note');
      return await response.json();
    } catch (error) {
      console.error('Error sharing note:', error);
      throw error;
    }
  }
};
