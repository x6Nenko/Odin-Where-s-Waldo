import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Root from './Routes/Root';
import Game from './Routes/Game';
import Leaderboard from './Routes/Leaderboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "game-1",
        element: <Game />,
      },
      {
        path: "game-2",
        element: <Game />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
