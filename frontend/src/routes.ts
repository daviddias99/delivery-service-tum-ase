const route = (def: string, ref?: (..._args: any[]) => string ) => ({
  def: def,
  ref: ref || (() => def),
});

const routes = {
  /* Login */
  login: route('/login'),

  /* General */
  homepage: route('/homepage'),

  delivery: route(
    '/delivery/:deliveryId',
    (deliveryId) => (`/delivery/${deliveryId}`)
  ),

  deliveries: route(
    '/delivery/',
  ),

  boxes: route(
    '/box',
  ),

  box: route(
    '/box/:boxId',
    (boxId) => (`/box/${boxId}`)
  ),

  customer: route(
    '/customer/:customerId/orders',
    (customerId) => (`/customer/${customerId}/orders`)
  ),

  deliverer: route(
    '/deliverer/:delivererId/deliveries',
    (delivererId) =>(`/deliverer/${delivererId}/deliveries`)
  ),
  userMangement: route(
    '/dispatcher/userManagement/',
  ),
  userList: route(
    '/dispatcher/usersList',
  ),
  orderSearch: route(
    '/orders/search'
  )
};

export default routes;