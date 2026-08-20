import React, { useEffect, useState } from 'react'
import "./orders.css"
import { useSelector } from 'react-redux'


export default function Orders() {
    const [Orders, setorders] = useState([])
    const user = useSelector((state) => state.user)

    useEffect(() => {
        const allorder = JSON.parse(localStorage.getItem("orders")) || []
        setorders(allorder.filter((el) => {
            return (user.id === el.userId
            )
        }))
    }, [])
    return (
        <div className="orders-page">

            <div className="orders-header">
                <h1>My Orders</h1>
                <p>View your order history</p>
            </div>

            <div className="orders-content">

                <div className="orders-list">
                    {Orders.map((el) => {
                        return (
                            <div className="order-card">

                                <div className="order-header">
                                    <div>
                                        <h3>Order Id : {el.orderId}</h3>
                                        <p>Order Date : {el.date}</p>
                                    </div>

                                    <div className="order-status">
                                        {el.status}
                                    </div>
                                </div>

                                <div className="order-items">{
                                    el.items.map((e) => {
                                        return (
                                            <div className="order-item">

                                                <div className="order-item-image">
                                                    <img src={e.img || null} alt="" />
                                                </div>


                                                <div className="order-item-details">
                                                    <h3>{e.Product}</h3>
                                                    <p>{e.Category}</p>
                                                    <p>₹{e.Price} × Quantity {e.quantity}</p>
                                                </div>

                                                <div className="order-item-total">
                                                    <h3>₹{(Number(String(e.Price).replace(/,/g, "")) * Number(e.quantity)).toLocaleString("en-IN")}</h3>
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                                </div>

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
                        )
                    })}
                </div>

            </div>

        </div>
    )
}
