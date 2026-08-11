import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import ProductList from "./ProductList";
import Footer from "./Footer";

function UserHomePage() {

  const [AllProduct, setAllProduct] = useState([]);

  useEffect(() => {

    const products =
      JSON.parse(localStorage.getItem("Product")) || [];

    setAllProduct(products);

  }, []);

  return (
    <div className="store">
      <Navbar />
      <Hero />
      <Categories />
      <ProductList AllProduct={AllProduct} />
      <Footer />
    </div>
  );
}

export default UserHomePage;