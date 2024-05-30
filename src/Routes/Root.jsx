import { Outlet, useLocation } from "react-router-dom";
import Home from "./Home";
import { TimerProvider } from "../contexts/TimerContext";

const Root = () => {
  let location = useLocation();

  return (
    <div className="main-wrapper">
      {location.pathname === "/" && <Home />}
      <TimerProvider>
        <Outlet />
      </TimerProvider>
    </div>
  )
}

export default Root