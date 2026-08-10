import React, { useEffect, useState } from "react";
import "./Homepage.css";

function UserHomePage() {

  const [AllProduct, setAllProduct] = useState([])

  useEffect(() => { setAllProduct(JSON.parse(localStorage.getItem("Product")) || []) }
    , [])
  return (
    <div className="store">

      {/* Top navigation bar */}
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
          <button>Login</button>
        </div>
      </nav>

      {/* Hero / banner section */}
      <div className="hero">
        <h1>Timeless Jewelry, Made for You</h1>
        <p>Explore our handcrafted collection of rings, necklaces, and more.</p>
        <button className="shop-btn">Shop Now</button>
      </div>

      {/* Categories section */}
      <div className="section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">Rings</div>
          <div className="category-card">Necklaces</div>
          <div className="category-card">Earrings</div>
          <div className="category-card">Bracelets</div>
        </div>
      </div>

      {/* Featured products section */}
      <div className="section">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {AllProduct.map((el ,index) => {
            return (
              <div className="product-card" key={index}>
                <div className="product-image">
                  {/* Product image can go here */}
                </div>

                <h3>{el.Product}</h3>

                <p>${el.Price}</p>

                <button>Add to Cart</button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Lumen Jewelry. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default UserHomePage;