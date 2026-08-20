import React, { useEffect } from "react";
import "./Homepage.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductList from "./ProductList";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../Redux/slices/cartSlice";

/**
 * UserHomePage - Main storefront page.
 * Composes Navbar, Hero, ProductList (with Category filter), and Footer.
 * Handles loading and persisting the user's cart from/to localStorage.
 */
function UserHomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  // Load the logged-in user's cart from localStorage on mount or user change
  useEffect(() => {
    if (user.id !== "") {
      const carts = JSON.parse(localStorage.getItem("Cart")) || [];

      const userCart = carts.find(
        (cart) => cart.userId === user.id
      );

      dispatch(
        setCart({
          userId: user.id,
          items: userCart ? userCart.items : [],
        })
      );
    }
  }, [user.id, dispatch]);

  // Persist the cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.userId === "") return;

    const carts = JSON.parse(localStorage.getItem("Cart")) || [];

    const userCart = {
      userId: cart.userId,
      items: cart.items,
    };

    // Update existing user's cart or add a new entry
    const index = carts.findIndex(
      (item) => item.userId === cart.userId
    );

    if (index !== -1) {
      carts[index] = userCart;
    } else {
      carts.push(userCart);
    }

    localStorage.setItem("Cart", JSON.stringify(carts));
  }, [cart]);

  return (
    <div className="store">
      <Navbar />
      <Hero />
      <ProductList />
      <Footer />
    </div>
  );
}

export default UserHomePage;