import React from "react";

function ProductList({ AllProduct }) {

  return (
    <div className="section">

      <h2>Featured Products</h2>

      <div className="product-grid">

        {AllProduct.map((el, index) => {

          return (
            <div className="product-card" key={index}>

              <div className="product-image">
                {/* Product image */}
              </div>

              <h3>
                {el.Product}
              </h3>

              <p>
                ${el.Price}
              </p>

              <button>
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