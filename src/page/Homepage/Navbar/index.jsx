import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <h2 className="brand">Lumen Jewelry</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Shop</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="nav-icons">
        <span>Cart (0)</span>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

    </nav>
  );
}

export default Navbar;