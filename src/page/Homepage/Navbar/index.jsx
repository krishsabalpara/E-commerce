import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"



function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  console.log(user);

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

        {
          user.name === "" ? <button onClick={() => navigate("/login")}>
            Login
          </button> : user.name }
      </div>

    </nav>
  );
}

export default Navbar;