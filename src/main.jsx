import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Root from './Routes/Root';
import GameOne from './Routes/GameOne';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "game1",
        element: <GameOne />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
