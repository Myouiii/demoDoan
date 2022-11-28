import React from 'react';
import { Route } from 'react-router-dom';
import constants from '../constants/index.js';
import HomePage from '../containers/HomePage';
import ProductDetailPage from '../containers/ProductDetailPage';


// lazy loading
const SignUp = React.lazy(() => import('../containers/SignUp'));
const Login = React.lazy(() => import('../containers/Login'));
const ForgotPassword = React.lazy(() =>
  import('~/containers/Login/ForgotPassword'),
);
const NotFound = React.lazy(() => import('../components/NotFound'));
const Cart = React.lazy(() => import('../components/Cart'));
const AdminPage = React.lazy(() => import('../containers/AdminPage'));
// const SearchResult = React.lazy(() =>
//   import('../containers/SearchFilterPage/Search'),
// );
// const FilterResult = React.lazy(() =>
//   import('../containers/SearchFilterPage/Filter'),
// );
const AccountPage = React.lazy(() => import('../containers/AccountPage'));
const PaymentPage = React.lazy(() => import('../containers/PaymentPage'));

// Public routes
const publicRoutes = [
    {
        path: constants.ROUTES.HOME,
        exact: true,
        main: HomePage,
      },
      {
        path: constants.ROUTES.PRODUCT,
        main: ProductDetailPage,
      },
      {
        path: constants.ROUTES.SIGNUP,
        exact: true,
        main: SignUp,
      },
      {
        path: constants.ROUTES.LOGIN,
        exact: true,
        main: Login,
      },
      {
        path: constants.ROUTES.FORGOT_PASSWORD,
        exact: true,
        main: ForgotPassword,
      },
      
      {
        path: constants.ROUTES.CART,
        exact: false,
        main: Cart,
      },
      {
        path: constants.ROUTES.NOT_FOUND,
        exact: true,
        main: NotFound,
      },
      // {
      //   path: constants.ROUTES.SEARCH,
      //   exact: true,
      //   main: <SearchResult />,
      // },
      // {
      //   path: constants.ROUTES.FILTER,
      //   exact: true,
      //   main: <FilterResult />,
      // },
      {
        path: constants.ROUTES.ACCOUNT,
        exact: false,
        main: AccountPage,
      },
      {
        path: constants.ROUTES.ACCOUNT_ORDERS,
        exact: false,
        main: AccountPage,
      },
      {
        path: constants.ROUTES.ACCOUNT_ADDRESSES,
        exact: false,
        main: AccountPage,
      },
      {
        path: constants.ROUTES.PAYMENT,
        exact: true,
        main: PaymentPage,
      },

];
// render routes
const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, exact, main } = route;
      return <Route key={index} path={path} exact={exact} element={main} />;
    });
  };
const privateRoutes = [
    {
        path: constants.ROUTES.ADMIN,
        exact: true,
        main: AdminPage,
      },

];

export { publicRoutes, privateRoutes, renderRoutes };
