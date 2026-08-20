import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";

function ProductList() {
  const AllProduct = JSON.parse(localStorage.getItem("Product")) || []

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handeladdcart = (product) => {

    if (user.id === "") {
      alert("Please Login First");
      return;
    }

    dispatch(
      addToCart({
        userId: user.id,
        product: product
      })
    );
  };

  return (
    <div className="section">

      <h2>Featured Products</h2>

      <div className="product-grid">

        {AllProduct.map((el , index) => {

          return (
            <div className="product-card" key={el.id}>

              <div className="product-image">
              </div>

              <h3>
                {el.Product}
              </h3>

              <p>
                ${el.Price}
              </p>

              <button onClick={() => handeladdcart(el)}>
                Add to Cart
              </button>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default ProductList;