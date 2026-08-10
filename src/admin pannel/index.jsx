import React, { useEffect, useState } from "react";
import "./Admin.css";

function AdminPage() {
  const [page, setPage] = useState("home");
  const [Product, setProduct] = useState({})
  const [AllProduct, setAllProduct] = useState([])

  useEffect(() => { setAllProduct(JSON.parse(localStorage.getItem("Product")) || []) }
    , [])

  const HandelInput = (e) => {
    setProduct((pov) => ({
      ...pov,
      [e.target.name]: e.target.value
    }))
  }

  const HandelAddProductbut = () => {
    const DataBase = JSON.parse(localStorage.getItem("Product")) || [];
    DataBase.push(Product);
    setAllProduct(DataBase)
    localStorage.setItem("Product", JSON.stringify(DataBase))
  }


  //  const Handelinput = (el) => {
  //       setTaskData(
  //           (pov) => ({
  //               ...pov,
  //               [el.target.name]: el.target.value
  //           }))
  //   }

  return (
    <div className="admin">
      {/* Sidebar */}
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
            Add New
          </li>
          <li
            className={page === "inventory" ? "active" : ""}
            onClick={() => setPage("inventory")}
          >
            Inventory
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">

        {/* only shows if page is "home" */}
        {page === "home" && (
          <div className="section">
            <h2>Home</h2>
            <p>Welcome to the admin dashboard.</p>
          </div>
        )}

        {/* only shows if page is "add" */}
        {page === "add" && (
          <div className="section">
            <h2>Add New Product</h2>
            <input type="text" name="Product" placeholder="Product Name" onChange={(e) => { HandelInput(e) }} />
            <input type="text" name="description" placeholder="description" onChange={(e) => { HandelInput(e) }} />
            <input type="text" name="Price" placeholder="Price" onChange={(e) => { HandelInput(e) }} />
            <input type="text" name="Inverntry" placeholder="Inverntry" onChange={(e) => { HandelInput(e) }} />
            <select name="Category" onChange={(e) => { HandelInput(e) }}>
              <option value="">Select Category</option>
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Earrings">Earrings</option>
              <option value="Bracelets">Bracelets</option>

            </select>
            <button onClick={HandelAddProductbut}>Add Product</button>
          </div>
        )}

        {/* only shows if page is "inventory" */}
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
                {
                  AllProduct.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{el.Product}</td>
                          <td>{el.description}</td>
                          <td>{el.Price}</td>
                          <td>{el.Inverntry}</td>
                          <td>{el.Category}</td>
                          <td><button>Edit</button></td>
                          <td><button>Delete</button></td>
                        </tr>
                      )

                  })
                }
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPage;