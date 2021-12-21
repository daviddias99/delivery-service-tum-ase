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
  box: (id: string) => `/box/${id}`,
  user: (id: string) => `/user/${id}`,
  allDeliveries: '/delivery/all',
  allBoxes: '/box/all',
  createBox: '/box/add',
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

const request = (path: string, method: RestMethod, data: any, callback: (_res: RequestResponse, _status: number) => any) => {

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
    callback(res, 500);
  };

  if (method.toLowerCase() === 'get') {
    axios.get(API_URL + path, { headers, params: data }).then((res) => callback(res.data, res.status)).catch(errorHandler);
  } else if (method.toLowerCase() === 'post') {
    axios.post(API_URL + path, data, { headers }).then((res) => callback(res.data, res.status)).catch(errorHandler);
  } else if (method.toLowerCase() === 'delete') {
    axios.delete(API_URL + path, { headers }).then((res) => callback(res.data, res.status)).catch(errorHandler);
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
  login: (data: any, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.login, 'post', data, callback);
  },
  logout: (callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.logout, 'post', null, callback);
  },
  getAllDeliveries: (callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.allDeliveries, 'get', null, callback);
  },
  getAllBoxes: (callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.allBoxes, 'get', null, callback);
  },
  getUser: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.user(id), 'get', null, callback);
  },
  getBox: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.box(id), 'get', null, callback);
  },
  createBox: (data: any, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.createBox, 'post', data, callback);
  },
};

export default api;
