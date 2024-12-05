import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Registration from '../pages/Auth/Registration';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';
import Chat from '../components/Chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: ':userId',
            element: <Chat />,
          },
        ],
      },
      {
        path: 'register',
        element: <Registration />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
