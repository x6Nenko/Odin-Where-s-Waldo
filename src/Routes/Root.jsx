import { Outlet, useLocation } from "react-router-dom";
import Home from "./Home";
import Navbar from "../components/Navbar";
import { TimerProvider } from "../contexts/TimerContext";

const Root = () => {
  let location = useLocation();

  return (
    <div className="main-wrapper">
      <Navbar />
      {location.pathname === "/" && 
          <Home />
      }
      <TimerProvider>
        <Outlet />
      </TimerProvider>
    </div>
  )
}

export default Root