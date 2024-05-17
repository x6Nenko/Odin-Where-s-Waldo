import { Outlet, useLocation } from "react-router-dom";
import Home from "./Home";

const Root = () => {
  let location = useLocation();

  return (
    <div className="main-wrapper">
      {location.pathname === "/" && <Home />}
      <Outlet />
    </div>
  )
}

export default Root