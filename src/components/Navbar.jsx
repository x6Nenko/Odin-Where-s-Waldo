import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Leaderboard
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar