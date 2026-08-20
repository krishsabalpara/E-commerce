import React, { useEffect } from "react";
import "./cart.css";
import Navbar from "../Homepage/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setCart,
} from "../../Redux/slices/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Cart - Shopping cart page.
 * Displays cart items with quantity controls, order summary,
 * and a checkout button that creates an order in localStorage.
 */
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const items = cart.items;
  const user = useSelector((state) => state.user);

  // Load the user's cart from localStorage on mount
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

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.userId === "") return;

    const carts = JSON.parse(localStorage.getItem("Cart")) || [];

    const userCart = {
      userId: cart.userId,
      items: cart.items,
    };

    // Update existing entry or add new one
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

  // --- Price calculations ---
  const subTotal = items.reduce((total, el) => {
    const price = Number(String(el.Price).replace(/,/g, "")) || 0;
    const quantity = Number(el.quantity) || 0;
    return total + price * quantity;
  }, 0);

  const shipping = items.length > 0 ? 200 : 0;
  const discount = 0;
  const total = subTotal + shipping - discount;

  /** Decrease item quantity by 1 (minimum 1) */
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  /** Increase item quantity by 1 */
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  /** Remove an item entirely from the cart */
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  /**
   * Checkout - creates a new order in localStorage,
   * clears the cart, and redirects to the homepage.
   */
  const handleCheckout = () => {
    // Bug 5 fix: Block checkout if user is not logged in
    if (user.id === "") {
      toast("Please login to place an order");
      navigate("/login");
      return;
    }

    // Bug 4 fix: Block checkout if cart is empty
    if (items.length === 0) {
      toast("Your cart is empty");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      orderId: uuidv4(),
      userId: user.id,
      items: items,
      subTotal: subTotal,
      discount: discount,
      shipping: shipping,
      date: new Date().toLocaleDateString(),
      total: total,
      status: "Pending",
      paymentStatus: "Pending",
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear the cart after placing the order
    dispatch(clearCart());
    toast("Order placed successfully!");
    navigate(`/?id=${user.id}`);
  };

  return (
    <div className="cart-page">
      <Navbar />

      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Your selected items</p>
      </div>

      <div className="cart-content">

        {/* Cart item list */}
        <div className="cart-items">
          {items.length === 0 ? (
            <p>Your cart is currently empty.</p>
          ) : (
            items.map((el) => {
              const price = Number(String(el.Price).replace(/,/g, "")) || 0;
              const quantity = Number(el.quantity) || 0;
              const itemTotal = price * quantity;

              return (
                <div className="cart-item" key={el.id}>

                  <div className="cart-item-image">
                    <img src={el.img || null} alt={el.Product} />
                  </div>

                  <div className="cart-item-details">
                    <h3>{el.Product}</h3>
                    <p>{el.Category}</p>
                    <p>₹{el.Price}</p>
                  </div>

                  <div className="cart-quantity">
                    <button onClick={() => handleDecrease(el.id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleIncrease(el.id)}>+</button>
                  </div>

                  <div className="cart-item-total">
                    <h3>₹{itemTotal}</h3>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(el.id)}
                  >
                    Remove
                  </button>

                </div>
              );
            })
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subTotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>₹{discount}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Order Items
          </button>

        </div>

      </div>

    </div>
  );
}