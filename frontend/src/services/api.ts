import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Constant variables
 */
const DEFAULT_API_URL = 'http://localhost:8088';
const API_URL: string = process.env.REACT_APP_API_URI ?? DEFAULT_API_URL;

/**
 * All the server API routes.
 */
const routes = {
  // Auth
  login: '/auth',
  logout: '/logout',

  // Delivery
  delivery: (id: string) => `/delivery/${id}`,
  updateDelivery: (id: string) => `/delivery/update/${id}`,
  deliveryByTracking: (id: string) => `/delivery/track/${id}`,
  createDelivery: '/delivery/add',
  allDeliveries: '/delivery/all',

  // Box
  box: (id: string) => `/box/${id}`,
  updateBox: (id: string) => `/box/update/${id}`,
  boxDeliveries: (id: string) => `/delivery/all/box/${id}`,
  allBoxes: '/box/all',
  createBox: '/box/add',
  createCustomer: '/user/customer/add',
  createDispatcher: '/user/dispatcher/add',
  createDeliverer: '/user/deliverer/add',
  deleteUser: (id: string) => `/user/${id}`,
  allCustomers: '/user/customer/all',
  allDispatchers: '/user/dispatcher/all',
  allDeliverers: '/user/deliverer/all',
  // TODO: change
  user: (id: string) => `/user/${id}`,
  customer: (id: string) => `/user/customer/${id}`,
  customerDeliveries: (id: string) => `/delivery/all/customer/${id}`,
  deliverer: (id: string) => `/user/deliverer/${id}`,
  delivererDeliveries: (id: string) => `/delivery/all/deliverer/${id}`,
  dispatcher: (id: string) => `/user/dispatcher/${id}`,
  dispatcherDeliveries: (id: string) => `/delivery/all/dispatcher/${id}`,
  dispatch: (id: string) => `/delivery/dispatch/${id}`
};

/**
 * Makes an authenticated request
 * to the path specified.
 *
 * In case the user is not authenticated,
 * makes an unauthenticated request.
 */

type RestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'get' | 'post' | 'put' | 'delete';

const errorHandler = (err: AxiosError, callback: (_res: AxiosResponse<any, any>) => void) => {
  const errorResponse: AxiosResponse<any, any> = {
    data: err,
    status: 500,
    statusText: 'An error occured',
    headers: {},
    config: {},
  };

  console.log('zebi');

  callback(errorResponse);
};

const request = (path: string, method: RestMethod, data: any, callback: (_res: AxiosResponse<any, any>) => void) => {

  path = path.startsWith('/') ? path : '/' + path;
  path = path.endsWith('/') ? path : path + '/';

  if (method.toLowerCase() === 'get') {
    axios.get(API_URL + path, { withCredentials: true, params: data }).then((res) => callback(res)).catch((err) => errorHandler(err, callback));
  } else if (method.toLowerCase() === 'post') {
    axios.post(API_URL + path, data, { withCredentials: true }).then((res) => callback(res)).catch((err) => errorHandler(err, callback));
  } else if (method.toLowerCase() === 'delete') {
    axios.delete(API_URL + path, { withCredentials: true }).then((res) => callback(res)).catch((err) => errorHandler(err, callback));
  } else if (method.toLowerCase() === 'put') {
    axios.put(API_URL + path, data, { withCredentials: true }).then((res) => callback(res)).catch((err) => errorHandler(err, callback));
  }
};

// eslint-disable-next-line no-unused-vars
const asyncRequest = async (path: string, method: RestMethod, data: any) => {
  path = path.startsWith('/') ? path : '/' + path;
  path = path.endsWith('/') ? path : path + '/';

  const headers = {};

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
  login: (data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    axios.post(API_URL + routes.login, {}, { withCredentials: true, auth: data }).then((res) => callback(res)).catch((err) => errorHandler(err, callback));
  },
  logout: (callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.logout, 'post', null, callback);
  },
  getAllDeliveries: (callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.allDeliveries, 'get', null, callback);
  },
  getAllBoxes: (callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.allBoxes, 'get', null, callback);
  },
  getAllCustomers: (callback:(_res:AxiosResponse<any, any>) => void) => {
    request(routes.allCustomers, 'get', null, callback);
  },
  getAllDeliverers: (callback:(_res:AxiosResponse<any, any>) => void) => {
    request(routes.allDeliverers, 'get', null, callback);
  },
  deleteUser: (id: string, callBack: (_res:AxiosResponse <any, any>) => void) => {
    request(routes.deleteUser(id), 'delete', null, callBack);
  },
  getALlDispatchers: (callback:(_res:AxiosResponse<any, any>) => void) => {
    request(routes.allDispatchers, 'get', null, callback);
  },
  getUser: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.user(id), 'get', null, callback);
  },
  getBox: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.box(id), 'get', null, callback);
  },
  getBoxDeliveries: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.boxDeliveries(id), 'get', null, callback);
  },
  getDelivery: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.delivery(id), 'get', null, callback);
  },
  createDelivery: (data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.createDelivery, 'post', data, callback);
  },
  createBox: (data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.createBox, 'post', data, callback);
  },
  deleteBox: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.box(id), 'delete', null, callback);
  },
  getByTrackingCode: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.deliveryByTracking(id), 'get', null, callback);
  },
  editBox: (id: string, data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.updateBox(id), 'put', data, callback);
  },
  editDelivery: (id: string, data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.updateDelivery(id), 'put', data, callback);
  },
  getCustomer: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.customer(id), 'get', null, callback);
  },
  createCustomer: (data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.createCustomer, 'post', data, callback);
  },
  createDispatcher: (data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.createDispatcher, 'post', data, callback);
  },
  createDeliverer: (data: any, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.createDeliverer, 'post', data, callback);
  },
  getCustomerDeliveries: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.customerDeliveries(id), 'get', null, callback);
  },
  getDeliverer: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.deliverer(id), 'get', null, callback);
  },
  getDelivererDeliveries: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.delivererDeliveries(id), 'get', null, callback);
  },
  getDispatcher: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.dispatcher(id), 'get', null, callback);
  },
  getDispatcherDeliveries: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.dispatcherDeliveries(id), 'get', null, callback);
  },
  dispatch: (id: string, callback: (_res: AxiosResponse<any, any>) => void) => {
    request(routes.dispatch(id), 'post', null, callback);
  },
};

export default api;
