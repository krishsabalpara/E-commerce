import React, { useEffect } from 'react'
import "./cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, setCart } from '../../Redux/slices/cartSlice'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const dispatch = useDispatch()
    const navigat = useNavigate()
    const cart = useSelector((state) => state.cart)
    const items = cart.items


    const user = useSelector((state) => state.user);
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



    const subTotal = items.reduce((total, el) => {
        const price = Number(String(el.Price).replace(/,/g, "")) || 0
        const quantity = Number(el.quantity) || 0

        return total + (price * quantity)
    }, 0)

    const shipping = 200

    const discount = 0

    const Total = subTotal + shipping - discount

    const handeldi = (id) => {
        dispatch(decreaseQuantity(id))
    }

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id))
    }

    const handelremove = (id) => {
        dispatch(removeFromCart(id))
    }

    const handelchechout = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        orderId: uuidv4(),
        userId: user.id,
        items: items,
        subTotal: subTotal,
        discount: discount,
        shipping: shipping,
        date: new Date().toLocaleDateString(),
        total: Total,
        status: "Pending",
        paymentStatus: "Pending",
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    dispatch(clearCart());

    navigat(`/?id=${user.id}`);
};

    return (
        <div className="cart-page">

            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>Your selected items</p>
            </div>

            <div className="cart-content">

                <div className="cart-items">

                    {
                        items.map((el) => {

                            const price =
                                Number(String(el.Price).replace(/,/g, "")) || 0

                            const quantity =
                                Number(el.quantity) || 0

                            const itemTotal = price * quantity

                            return (
                                <div className="cart-item" key={el.id}>

                                    <div className="cart-item-image">
                                        <img
                                            src={el.img || null}
                                            alt={el.Product}
                                        />
                                    </div>

                                    <div className="cart-item-details">
                                        <h3>{el.Product}</h3>
                                        <p>{el.Category}</p>
                                        <p>₹{el.Price}</p>
                                    </div>

                                    <div className="cart-quantity">

                                        <button
                                            onClick={() => handeldi(el.id)}
                                        >
                                            -
                                        </button>

                                        <span>{quantity}</span>

                                        <button
                                            onClick={() => handleIncrease(el.id)}
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className="cart-item-total">
                                        <h3>₹{itemTotal}</h3>
                                    </div>

                                    <button className="remove-btn" onClick={() => handelremove(el.id)}>
                                        Remove
                                    </button>

                                </div>
                            )
                        })
                    }

                </div>

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
                        <span>₹{Total}</span>
                    </div>

                    <button className="checkout-btn" onClick={handelchechout}>
                        Order Items
                    </button>

                </div>

            </div>

        </div>
    )
}