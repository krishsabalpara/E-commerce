import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";
import { toast } from "react-toastify";

/**
 * ProductList - Displays products with category filtering logic.
 * Category filtering logic is implemented directly above the product display.
 */
function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load all products from localStorage (managed by the admin panel)
  const allProducts = JSON.parse(localStorage.getItem("Product")) || [];

  // Load categories from localStorage or fallback to defaults
  const savedCategories = JSON.parse(localStorage.getItem("Category")) || [];
  const defaultCategories = [
    { id: "cat-1", Category: "Rings" },
    { id: "cat-2", Category: "Necklaces" },
    { id: "cat-3", Category: "Earrings" },
    { id: "cat-4", Category: "Bracelets" },
  ];
  const categoriesList = savedCategories.length > 0 ? savedCategories : defaultCategories;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  /** Add a product to the cart; shows toast if user is not logged in */
  const handleAddToCart = (product) => {
    if (user.id === "") {
      toast("Please Login First");
      return;
    }

    dispatch(
      addToCart({
        userId: user.id,
        product: product,
      })
    );
    toast(`${product.Product} added to cart!`);
  };

  // --- Category Filtering Logic ---
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.Category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );

  return (
    <>
      {/* Category Filter Section */}
      <div className="section" id="shop">
        <h2>Shop by Category</h2>

        <div className="category-grid">
          {/* "All" Category Pill */}
          <div
            className={`category-card ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </div>

          {/* Dynamic Categories */}
          {categoriesList.map((cat, index) => (
            <div
              key={cat.id || index}
              className={`category-card ${selectedCategory === cat.Category ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.Category)}
            >
              {cat.Category}
            </div>
          ))}
        </div>
      </div>

      {/* Featured / Filtered Products Section */}
      <div className="section">
        <h2>
          {selectedCategory === "All"
            ? "Featured Products"
            : `${selectedCategory} Collection`}
        </h2>

        {filteredProducts.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            No products found in "{selectedCategory}".
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((el) => {
              return (
                <div className="product-card" key={el.id}>
                  <div className="product-image"></div>

                  <h3>{el.Product}</h3>

                  <p>₹{el.Price}</p>

                  <button onClick={() => handleAddToCart(el)}>
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;