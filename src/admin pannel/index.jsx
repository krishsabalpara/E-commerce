import React, { useEffect, useState } from "react";
import "./Admin.css";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Orders from "./orders";

/**
 * AdminPage - Admin dashboard for managing products, categories, and orders.
 * Protected route — only accessible when logged in as admin@admin.com.
 * Data is persisted in localStorage under "Product" and "Category" keys.
 */
function AdminPage() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState({
    Category: "",
    Inverntry: "",
    Price: "",
    Product: "",
    description: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [inputCategory, setInputCategory] = useState({
    Category: "",
  });
  const [params] = useSearchParams();
  const email = params.get("email");
  const navigate = useNavigate();

  // Guard: redirect non-admin users to the login page (Bug 7 & 11 fix)
  useEffect(() => {
    if (email !== "admin@admin.com") {
      navigate("/login");
    }
  }, [email, navigate]);

  // Load products and categories from localStorage on mount
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("Product")) || []);
    setAllCategory(JSON.parse(localStorage.getItem("Category")) || []);
  }, []);

  /** Handle input changes for the product form */
  const handleProductInput = (e) => {
    setAddProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Validate that all product fields are filled.
   * Shows a toast message for the first empty field found.
   * @returns {boolean} true if all fields are valid
   */
  const validateProduct = () => {
    if (addProduct.Product === "") { toast("Fill Name"); return false; }
    else if (addProduct.description === "") { toast("Fill description"); return false; }
    else if (addProduct.Price === "") { toast("Fill Price"); return false; }
    else if (addProduct.Inverntry === "") { toast("Fill Inverntry"); return false; }
    else if (addProduct.Category === "") { toast("select Category"); return false; }
    return true;
  };

  /**
   * Add a new product or update an existing one.
   * If addProduct.id exists, it's an edit; otherwise it's a new product.
   */
  const handleAddProduct = () => {
    if (!validateProduct()) return;

    if (addProduct.id) {
      // --- Edit existing product ---
      const dataBase = JSON.parse(localStorage.getItem("Product")) || [];
      const updatedDataBase = dataBase.map((el) => {
        if (el.id === addProduct.id) {
          return {
            ...el,
            Product: addProduct.Product,
            Category: addProduct.Category,
            Inverntry: addProduct.Inverntry,
            Price: addProduct.Price,
            description: addProduct.description,
          };
        }
        return el;
      });
      setProducts(updatedDataBase);
      localStorage.setItem("Product", JSON.stringify(updatedDataBase));
      setPage("inventory");
    } else {
      // --- Add new product ---
      const dataBase = JSON.parse(localStorage.getItem("Product")) || [];
      let newProduct = {
        ...addProduct,
        id: uuidv4(),
      };
      dataBase.push(newProduct);
      setProducts(dataBase);
      localStorage.setItem("Product", JSON.stringify(dataBase));

      // Reset the form after adding
      setAddProduct({
        Category: "",
        Inverntry: "",
        Price: "",
        Product: "",
        description: "",
      });
    }
  };

  /** Handle input changes for the category form */
  const handleCategoryInput = (e) => {
    setInputCategory({
      Category: e.target.value,
    });
  };

  /**
   * Validate that the category name is not empty.
   * @returns {boolean} true if valid
   */
  const validateCategory = () => {
    if (inputCategory.Category === "") {
      toast("Enter Category Name");
      return false;
    }
    return true;
  };

  /** Add a new category to localStorage and state (Bug 3 fix) */
  const handleAddCategory = () => {
    if (!validateCategory()) return;

    let temp = {
      Category: inputCategory.Category,
      id: uuidv4(),
    };
    const updatedCategory = [...allCategory, temp];
    setAllCategory(updatedCategory);
    localStorage.setItem("Category", JSON.stringify(updatedCategory));

    // Reset the category input
    setInputCategory({ Category: "" });
  };

  /** Delete a category by its id */
  const handleDeleteCategory = (id) => {
    let temp = allCategory.filter((e) => e.id !== id);
    setAllCategory(temp);
    localStorage.setItem("Category", JSON.stringify(temp));
  };

  /** Load a product's data into the form for editing */
  const handleEditProduct = (id) => {
    let edit = products.find((el) => el.id === id);
    setAddProduct(edit);
    setPage("add");
  };

  /** Delete a product by its id */
  const handleDeleteProduct = (id) => {
    let temp = products.filter((e) => e.id !== id);
    setProducts(temp);
    localStorage.setItem("Product", JSON.stringify(temp));
  };

  return (
    <div className="admin">

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2 className="logo">Admin Panel</h2>

        <ul className="menu">
          <li
            className={page === "home" ? "active" : ""}
            onClick={() => setPage("home")}
          >
            Home
          </li>
          <li
            className={page === "add" ? "active" : ""}
            onClick={() => setPage("add")}
          >
            Add New Product
          </li>
          <li
            className={page === "category" ? "active" : ""}
            onClick={() => setPage("category")}
          >
            Add New Category
          </li>
          <li
            className={page === "inventory" ? "active" : ""}
            onClick={() => setPage("inventory")}
          >
            Inventory
          </li>
          <li
            className={page === "orders" ? "active" : ""}
            onClick={() => setPage("orders")}
          >
            Orders
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="content">

        {/* Home Dashboard */}
        {page === "home" && (
          <div className="section">
            <h2>Home</h2>
            <p>Welcome to the admin dashboard.</p>
          </div>
        )}

        {/* Add / Edit Product Form */}
        {page === "add" && (
          <div className="section">

            <h2>Add New Product</h2>

            <input
              type="text"
              name="Product"
              placeholder="Product Name"
              value={addProduct.Product}
              onChange={handleProductInput}
            />

            <input
              type="text"
              name="description"
              placeholder="description"
              value={addProduct.description}
              onChange={handleProductInput}
            />

            <input
              type="text"
              name="Price"
              placeholder="Price"
              value={addProduct.Price}
              onChange={handleProductInput}
            />

            <input
              type="text"
              name="Inverntry"
              placeholder="Inverntry"
              value={addProduct.Inverntry}
              onChange={handleProductInput}
            />

            <select
              value={addProduct.Category}
              name="Category"
              onChange={handleProductInput}
            >
              <option value="">Select Category</option>
              {allCategory.map((e, index) => {
                return (
                  <option value={e.Category} key={index}>
                    {e.Category}
                  </option>
                );
              })}
            </select>

            <button onClick={handleAddProduct}>
              Add Product
            </button>

          </div>
        )}

        {/* Category Management */}
        {page === "category" && (
          <div className="section">

            <h2>Add New Category</h2>

            <div className="category-form">

              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  name="Category"
                  placeholder="Enter category name"
                  value={inputCategory.Category}
                  onChange={handleCategoryInput}
                />
              </div>

              <button onClick={handleAddCategory}>
                Add Category
              </button>

            </div>

            {/* Existing Categories List */}
            <div className="category-list">

              <h2>Already Added Categories</h2>

              <div className="category-items">
                {allCategory.map((e, index) => {
                  return (
                    <div className="category-item" key={index}>
                      <span>{e.Category}</span>
                      <button onClick={() => handleDeleteCategory(e.id)}>
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* Product Inventory Table */}
        {page === "inventory" && (
          <div className="section">

            <h2>Inventory</h2>

            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {products.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.Product}</td>
                      <td>{el.description}</td>
                      <td>{el.Price}</td>
                      <td>{el.Inverntry}</td>
                      <td>{el.Category}</td>
                      <td>
                        <button onClick={() => handleEditProduct(el.id)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteProduct(el.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        )}

        {/* Orders Management */}
        {page === "orders" && <Orders />}

      </div>
    </div>
  );
}

export default AdminPage;