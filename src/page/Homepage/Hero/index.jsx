import React from "react";

/**
 * Hero - Hero banner section for the storefront landing page.
 * Displays the main tagline and a call-to-action button.
 */
function Hero() {
  return (
    <div className="hero">
      <h1>Timeless Jewelry, Made for You</h1>
      <p>
        Explore our handcrafted collection of rings,
        necklaces, and more.
      </p>
      <button className="shop-btn">Shop Now</button>
    </div>
  );
}

export default Hero;