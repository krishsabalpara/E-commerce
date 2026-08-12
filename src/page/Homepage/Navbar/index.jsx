import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import './navbar.css'
import { loginUser } from "../../../Redux/slices/userSlice";


function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()
  

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
          </button> : <div className="user-menu">
            {user.name === "" ? (
              <button onClick={() => navigate("/login")}>
                Login
              </button>
            ) : (
              <>
                <button onClick={() => setShowMenu(!showMenu)}>
                  {user.name} ▾
                </button>

                {showMenu && (
                  <div className="dropdown">
                    <button>Edit Profile</button>
                    <button onClick={() => {
                      dispatch(
                        loginUser({
                          id: "",
                          name: "",
                          email: "",
                        })
                      )
                      navigate("/")
                    }}>Logout</button>
                  </div>
                )}
              </>
            )}
          </div>}
      </div>

    </nav>
  );
}

export default Navbar;