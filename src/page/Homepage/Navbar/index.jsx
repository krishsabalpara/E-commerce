import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Sparkles,
  ShoppingBag,
  User,
  LogOut,
  Package,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import "./navbar.css";
import { loginUser } from "../../../Redux/slices/userSlice";

/**
 * Navbar - Top royal navigation bar for the storefront.
 * Features a top announcement bar, brand logo, navigation links,
 * cart button with badge counter, and user profile dropdown.
 */
function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** Calculate total items count in cart */
  const cartItemCount = cart.items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  /** Navigate to cart page */
  const handleCart = () => {
    navigate("/cart");
  };

  /** Scroll to top/shop section */
  const handleScrollToShop = () => {
    navigate("/");
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  /** Handle logout */
  const handleLogout = () => {
    dispatch(
      loginUser({
        id: "",
        name: "",
        email: "",
      })
    );
    setShowMenu(false);
    navigate("/");
  };

  return (
    <header className="header-wrapper">
      {/* Top Royal Announcement Bar */}
      <div className="announcement-bar">
        <div className="ticker-track">
          <div className="ticker-item">
            <Sparkles size={13} className="ticker-icon" />
            <span>COMPLIMENTARY ROYAL PACKAGING & FREE INSURED SHIPPING ON ALL ORDERS</span>
          </div>
        </div>
      </div>

      <nav className="navbar">
        {/* Brand Logo */}
        <h2 className="brand" onClick={() => navigate("/")}>
          <div className="brand-badge">
            <Sparkles size={18} className="brand-badge-icon" />
          </div>
          <div className="brand-text-container">
            <span className="brand-title">Lumen Jewelry</span>
          </div>
        </h2>

        {/* Mobile Hamburger Toggle */}
        <div
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>Home</li>
          <li onClick={() => { handleScrollToShop(); setMobileMenuOpen(false); }}>Shop</li>
          <li onClick={() => { handleScrollToShop(); setMobileMenuOpen(false); }}>Collections</li>
          <li onClick={() => { navigate("/orders"); setMobileMenuOpen(false); }}>Orders</li>
        </ul>

        {/* Actions & User Menu */}
        <div className="nav-icons">
          {/* Cart Button with Counter Badge */}
          <button className="cart-nav-btn" onClick={handleCart}>
            <ShoppingBag size={18} className="cart-icon" />
            <span className="cart-text">Cart</span>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>

          {/* User Auth / Profile */}
          {user.name === "" ? (
            <button className="login-nav-btn" onClick={() => navigate("/login")}>
              <User size={16} />
              <span>Login</span>
            </button>
          ) : (
            <div className="user-menu">
              <button
                className="user-profile-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="avatar-circle">
                  <span>{user.name ? user.name[0].toUpperCase() : "U"}</span>
                </div>
                <span>{user.name}</span>
                <ChevronDown size={14} className="arrow" />
              </button>

              {showMenu && (
                <div className="dropdown">
                  <div className="user-info-header">
                    <p className="user-info-name">{user.name}</p>
                    <p className="user-info-email">{user.email}</p>
                  </div>
                  <hr className="dropdown-divider" />
                  <button onClick={() => { navigate("/orders"); setShowMenu(false); }}>
                    <Package size={15} /> My Orders
                  </button>
                  {user.email === "admin@admin.com" && (
                    <button onClick={() => { navigate(`/admin/?email=${user.email}`); setShowMenu(false); }}>
                      <ShieldCheck size={15} /> Admin Dashboard
                    </button>
                  )}
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;