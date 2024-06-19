import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import App from '../pages/App';
import ErrorPage from '../pages/error/ErrorPage';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import RequiredAuth from '../utils/RequiredAuth';
import UserCollectionCards from '../pages/user-collection/UserCollectionCards';
import UserTradeCards from '../pages/user-trade-cards/UserTradeCards';
import UserAddCards from '../pages/user-add-cards/UserAddCards';
import UserTradesCollection from '../pages/all-user-trades/UserTradesCollection';
import { AuthProvider } from '../hooks/useAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider><App /></AuthProvider>, // Wrap App with AuthProvider
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true
      },
      {
        element: <RequiredAuth />,
        children: [
          {
            path: '/user/trades',
            element: <UserTradesCollection />
          },
          {
            path: '/cards',
            element: <UserAddCards />
          },
          {
            path: '/user/cards',
            element: <UserCollectionCards />
          },
          {
            path: '/user/trade-card',
            element: <UserTradeCards />
          }
        ]
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
  },
]);