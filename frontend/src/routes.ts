const route = (def: string, ref?: (...args: any[]) => string ) => ({
  def: def,
  ref: ref || (() => def),
});

const routes = {
  /* Login */
  login: route('/login'),

  /* General */
  dashboard: route('/dashboard'),

  delivery: route(
    '/delivery/:deliveryId',
    (deliveryId) => (`/researcher/${deliveryId}`)
  ),
};

export default routes;