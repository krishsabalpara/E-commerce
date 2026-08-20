import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import ProductList from "./ProductList";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../Redux/slices/cartSlice";

function UserHomePage() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  // User Cart Load From LocalStorage
  useEffect(() => {

    if (user.id !== "") {
      const carts = JSON.parse(localStorage.getItem("Cart")) || [];

      const userCart = carts.find(
        (cart) => cart.userId === user.id
      );

      dispatch(
        setCart({
          userId: user.id,
          items: userCart ? userCart.items : []
        })
      );
    }

  }, [user.id, dispatch]);


  // Cart Save To LocalStorage
  useEffect(() => {

    if (cart.userId === "") return;
    const carts = JSON.parse(localStorage.getItem("Cart")) || [];

    const userCart = {
      userId: cart.userId,
      items: cart.items
    };

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

      <Categories />

      <ProductList />

      <Footer />

    </div>
  );
}

export default UserHomePage;