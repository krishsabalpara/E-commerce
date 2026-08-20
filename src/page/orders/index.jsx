import React, { useEffect, useState } from "react";
import "./orders.css";
import Navbar from "../Homepage/Navbar";
import { useSelector } from "react-redux";

/**
 * Orders - User's order history page.
 * Loads all orders from localStorage and filters to show
 * only the currently logged-in user's orders.
 */
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  // Load and filter orders for the current user on mount (Bug 11 fix)
  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(
      allOrders.filter((el) => user.id === el.userId)
    );
  }, [user.id]);

  return (
    <div className="orders-page">
      <Navbar />

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View your order history</p>
      </div>

      <div className="orders-content">

        <div className="orders-list">
          {orders.map((el) => {
            return (
              <div className="order-card" key={el.orderId}>

                {/* Order header with ID, date, and status badge */}
                <div className="order-header">
                  <div>
                    <h3>Order Id : {el.orderId}</h3>
                    <p>Order Date : {el.date}</p>
                  </div>
                  <div className="order-status">{el.status}</div>
                </div>

                {/* List of items in this order */}
                <div className="order-items">
                  {el.items.map((e) => {
                    return (
                      <div className="order-item" key={e.id}>

                        <div className="order-item-image">
                          <img src={e.img || null} alt={e.Product} />
                        </div>

                        <div className="order-item-details">
                          <h3>{e.Product}</h3>
                          <p>{e.Category}</p>
                          <p>₹{e.Price} × Quantity {e.quantity}</p>
                        </div>

                        <div className="order-item-total">
                          <h3>
                            ₹{(
                              Number(String(e.Price).replace(/,/g, "")) *
                              Number(e.quantity)
                            ).toLocaleString("en-IN")}
                          </h3>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Order price summary */}
                <div className="order-summary">
                  <div>
                    <span>Subtotal</span>
                    <span>₹{el.subTotal}</span>
                  </div>
                  <div>
                    <span>Discount</span>
                    <span>₹{el.discount}</span>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <span>₹{el.shipping}</span>
                  </div>
                  <div className="order-total">
                    <span>Total</span>
                    <span>₹{el.total}</span>
                  </div>
                </div>

                <div className="order-footer">
                  <button>View Details</button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
