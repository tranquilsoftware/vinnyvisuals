import App from './App';
import { createBrowserRouter } from 'react-router-dom';

// export const router = createBrowserRouter([
//   {
//     path: '*',
//     element: <App />,
//   },

// ]);

export const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <App />,
    },
  ],
  {
    basename: '/vinnyvisuals/'
  }
);