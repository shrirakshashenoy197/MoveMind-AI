import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>MoveMind</span>
        <small>AI</small>
      </div>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/report">Report Hazard</NavLink>
        <NavLink to="/map">Risk Map</NavLink>
        <NavLink to="/routes">Route Comparison</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;