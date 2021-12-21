import axios, { AxiosError } from 'axios';

/**
 * Constant variables
 */
const DEFAULT_API_URL = 'http://localhost:8080';
const API_URL: string = process.env.REACT_APP_API_URI ?? DEFAULT_API_URL;

/**
 * All the server API routes.
 */
const routes = {
  login: '/login',
  logout: '/logout',
  delivery: (id: string) => `/delivery/${id}`,
  allDeliveries: '/delivery/all',
};

/**
 * Makes an authenticated request
 * to the path specified.
 *
 * In case the user is not authenticated,
 * makes an unauthenticated request.
 */

type RestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'get' | 'post' | 'put' | 'delete';

type RequestResponse = {
  status: string,
  data?: any,
  error?: any
}

const request = (path: string, method: RestMethod, data: any, callback: (_res: RequestResponse) => any) => {

  path = path.startsWith('/') ? path : '/' + path;
  path = path.endsWith('/') ? path : path + '/';

  const headers = {};

  // TODO: Add authorization headers here

  const errorHandler = (err: AxiosError) => {
    if (err.response) { // Server replied with non 2xx
    } else if (err.request) { // Network error / Server did not reply
    } else { // Other error
    }

    const res = { status: 'error', error: err };
    callback(res);
  };

  if (method.toLowerCase() === 'get') {
    axios.get(API_URL + path, { headers, params: data }).then((res) => callback(res.data)).catch(errorHandler);
  } else if (method.toLowerCase() === 'post') {
    axios.post(API_URL + path, data, { headers }).then((res) => callback(res.data)).catch(errorHandler);
  } else if (method.toLowerCase() === 'delete') {
    axios.delete(API_URL + path, { headers }).then((res) => callback(res.data)).catch(errorHandler);
  }
};

// eslint-disable-next-line no-unused-vars
const asyncRequest = async (path: string, method: RestMethod, data: any) => {
  path = path.startsWith('/') ? path : '/' + path;
  path = path.endsWith('/') ? path : path + '/';

  const headers = {};

  // TODO: Add authorization headers here

  if (method.toLowerCase() === 'get') {
    return axios.get(API_URL + path, { headers, params: data });
  } else if (method.toLowerCase() === 'post') {
    return axios.post(API_URL + path, data, { headers });
  } else if (method.toLowerCase() === 'delete') {
    return axios.delete(API_URL + path, { headers });
  }
};

/**
 * Main API controller.
 *
 * Deals with all communication between
 * the app and the server.
 */
const api = {
  login: (data: any, callback: (_res: RequestResponse) => any) => {
    request(routes.login, 'post', data, callback);
  },
  logout: (callback: (_res: RequestResponse) => any) => {
    request(routes.logout, 'post', null, callback);
  },
  getAllDeliveries: (callback: (_res: RequestResponse) => any) => {
    request(routes.allDeliveries, 'get', null, callback);
  },
};

export default api;
