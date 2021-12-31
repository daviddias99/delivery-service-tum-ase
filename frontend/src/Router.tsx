import React, { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import routes from 'routes';

import Homepage from 'pages/Homepage/Homepage';
import Boxes from 'pages/Boxes/Boxes';
import Deliveries from 'pages/Deliveries/Deliveries';
import DeliveriesOverview from 'pages/Deliverer/DeliveriesOverview';
import Box from 'pages/Box/Box';
import Delivery from 'pages/Delivery/Delivery';
import Orders from 'pages/Customer/Orders';
import { useSelector } from 'react-redux';
import { isLoggedIn, loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import NotFound from 'pages/NotFound/NotFound';

type PrivateRouteProps = {
  children: ReactElement,
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {

  const loggedIn = useSelector(isLoggedIn); // Later use Redux to fetch logged in status
  return loggedIn
    ? children
    : <Navigate to="/" />;
};

const getDefaultRoute = (user: any) => {

  switch (user.role) {
    case 'dispatcher':
      return routes.deliveries.def;
    case 'deliverer':
      return routes.deliverer.ref(user.id);
    case 'customer':
      return routes.customer.ref(user.id);
    default:
      return routes.homepage.def;
  }
};

const Router = () => {

  const loggedIn = useSelector(isLoggedIn); // Later use Redux to fetch logged in status
  const user = useSelector(loggedUser); // Later use Redux to fetch logged in status

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={loggedIn ? getDefaultRoute(user) : routes.homepage.def} />} />

        <Route path={routes.homepage.def} element={
          <Homepage />
        }
        />

        <Route path={routes.boxes.def} element={
          <PrivateRoute>
            <Boxes />
          </PrivateRoute>
        }
        />

        <Route path={routes.box.def} element={
          <PrivateRoute>
            <Box />
          </PrivateRoute>
        }
        />

        <Route path={routes.deliveries.def} element={
          <PrivateRoute>
            <Deliveries />
          </PrivateRoute>
        }
        />

        <Route path={routes.delivery.def} element={
          <Delivery />
        }
        />
        <Route path={routes.customer.def} element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
        />
        <Route path={routes.deliverer.def} element={
          <PrivateRoute>
            <DeliveriesOverview />
          </PrivateRoute>
        }
        />
        <Route path="*" element={
          <NotFound />
        }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
