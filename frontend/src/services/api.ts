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
  deliveryByTracking: (id: string) => `/delivery/track/${id}`,
  box: (id: string) => `/box/${id}`,
  updateBox: (id: string) => `/box/update/${id}`,
  boxDeliveries: (id: string) => `/delivery/all/box/${id}`,
  user: (id: string) => `/user/${id}`,
  allDeliveries: '/delivery/all',
  allBoxes: '/box/all',
  createBox: '/box/add',
  // TODO: change
  customer: (id: string) => `/user/${id}`,
  customerDeliveries: (id: string) => `/delivery/all/customer/${id}`,
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
  } else if (method.toLowerCase() === 'put') {
    axios.put(API_URL + path, data, { headers }).then((res) => callback(res.data, res.status)).catch(errorHandler);
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
  getBoxDeliveries: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.boxDeliveries(id), 'get', null, callback);
  },
  getDelivery: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.delivery(id), 'get', null, callback);
  },
  createBox: (data: any, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.createBox, 'post', data, callback);
  },
  deleteBox: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.box(id), 'delete', null, callback);
  },
  getByTrackingCode: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.deliveryByTracking(id), 'get', null, callback);
  },
  editBox: (id: string, data: any, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.updateBox(id), 'put', data, callback);
  },
  getCustomer: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.customer(id), 'get', null, callback);
  },
  getCustomerDeliveries: (id: string, callback: (_res: RequestResponse, _status: number) => any) => {
    request(routes.customerDeliveries(id), 'get', null, callback);
  },
};

export default api;
