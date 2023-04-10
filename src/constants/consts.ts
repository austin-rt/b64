export const BASE_URL = {
  API: 'http://localhost:3001'
  // API: 'https://api.b64.app',
};

export const API_ENDPOINTS = {
  USERS: '/users',
  AUTH: {
    GOOGLE: {
      LOGIN: 'auth/google',
      LOGOUT: 'auth/logout'
    },
    LOGIN: {
      SUCCESS: 'auth/login/success',
      FAILED: 'auth/login/failed'
    }
  }
};
