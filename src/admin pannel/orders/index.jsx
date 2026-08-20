import React, { useEffect, useState } from "react";
import "../Admin.css";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const allOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        setOrders(allOrders.filter((el) => el !== null));
    }, []);

    const handelview = (id) => {

        const updatedOrders = orders.map((el) => {

            if (el.orderId === id) {
                return {
                    ...el,
                    status: "completed"
                };
            }

            return el;
        });

        setOrders(updatedOrders);

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );
    };

    return (
        <div className="section">

            <h2>Orders</h2>
            <p>Manage all customer orders</p>

            <table>

                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>User Name</th>
                        <th>Items</th>
                        <th>Total Bill</th>
                        <th>Status</th>
                        <th>View</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map((el, index) => {

                        return (
                            <tr key={el.orderId}>

                                <td>{index + 1}</td>

                                <td>{el.date}</td>

                                <td>{el.userId}</td>

                                <td>
                                    {el.items?.length || 0}
                                </td>

                                <td>
                                    ₹{el.total}
                                </td>

                                <td>
                                    {el.status}
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            handelview(el.orderId)
                                        }
                                    >
                                        View
                                    </button>
                                </td>

                            </tr>
                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}