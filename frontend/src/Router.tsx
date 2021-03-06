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
import AddUserPage from './pages/AddUser/AddUserPage';
import UsersListPage from './pages/UsersList/UsersListPage';
import { useSelector } from 'react-redux';
import { isLoggedIn, loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import NotFound from 'pages/NotFound/NotFound';
import { User } from 'types';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';
import OrderSearchPage from 'pages/OrderSearch/OrderSearch';

type PrivateRouteProps = {
  children: ReactElement,
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {

  const loggedIn = useSelector(isLoggedIn); // Later use Redux to fetch logged in status
  return loggedIn
    ? children
    : <Navigate to="/" />;
};

const getDefaultRoute = (user: User) => {

  switch (user.role) {
    case 'DISPATCHER':
      return routes.deliveries.def;
    case 'DELIVERER':
      return routes.deliverer.ref(user.id);
    case 'CUSTOMER':
      return routes.orderSearch.ref(user.id);
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
          <PrivateRoute>
            <Delivery />
          </PrivateRoute>
        }
        />
        <Route path={routes.customer.def} element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
        />
        <Route path={routes.orderSearch.def} element={
          <PrivateRoute>
            <OrderSearchPage />
          </PrivateRoute>
        }
        />
        <Route path={routes.deliverer.def} element={
          <PrivateRoute>
            <DeliveriesOverview />
          </PrivateRoute>
        }
        />

        <Route path={routes.userManagement.def} element={
          <PrivateRoute>
            <AddUserPage />
          </PrivateRoute>
        }
        />
        <Route path={routes.userList.def} element={
          <PrivateRoute>
            <UsersListPage />
          </PrivateRoute>
        }
        />
        <Route path={routes.userProfile.def} element={
          <PrivateRoute>
            <UserProfilePage />
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
