import React, { useEffect, useState } from "react";
import "./Admin.css";
import { v4 as uuidv4, validate } from "uuid";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function AdminPage() {
  const [page, setPage] = useState("home");
  const [Product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState({
    Category: "",
    Inverntry: "",
    Price: "",
    Product: "",
    description: ""
  })
  const [allCategory, setAllCategory] = useState([]);
  const [inputCategory, setInputCategory] = useState({
    Category: "",
  });
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigat = useNavigate()

  useEffect( () => {
    if (id != "bd876462-13e2-409b-9ae4-d8fd0310b3c5") {
    navigat("/login")
  }},[] )

  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("Product")) || []);
    setAllCategory(JSON.parse(localStorage.getItem("Category")) || []);
  }, []);

  const HandelInput = (e) => {
    setAddProduct((pov) => ({
      ...pov,
      [e.target.name]: e.target.value,
    }));
  };

  let validate = "false";
  const validateProduct = () => {
    if (addProduct.Product === "") { toast("Fill Name") }
    else if (addProduct.description === "") { toast("Fill description") }
    else if (addProduct.Price === "") { toast("Fill Price") }
    else if (addProduct.Inverntry === "") { toast("Fill Inverntry") }
    else if (addProduct.Category === "") { toast("select Category") }
    else validate = "true"
  }
  const HandelAddProductbut = () => {
    validateProduct()
    if (validate == "true") {
      if (addProduct.id) {
        const DataBase = JSON.parse(localStorage.getItem("Product")) || [];
        DataBase.map((el) => {
          if (el.id === addProduct.id) {
            el.Product = addProduct.Product
            el.Category = addProduct.Category
            el.Inverntry = addProduct.Inverntry
            el.Price = addProduct.Price
            el.description = addProduct.description
          }
        })
        setProduct(DataBase);
        localStorage.setItem("Product", JSON.stringify(DataBase));
        setPage("inventory")
      }
      else {
        const DataBase = JSON.parse(localStorage.getItem("Product")) || [];
        let newProduct = {
          ...addProduct,
          id: uuidv4()
        };
        DataBase.push(newProduct);
        setProduct(DataBase);
        localStorage.setItem("Product", JSON.stringify(DataBase));
        setAddProduct({
          Category: "",
          Inverntry: "",
          Price: "",
          Product: "",
          description: ""
        })
        validate = "false"
      }
    }
  };

  const HandleCategoryInput = (e) => {
    setInputCategory({
      Category: e.target.value
    });
  };

  const validateCategory = () => {
    if (inputCategory.Category === "") { toast("Enter Category Name") }
    else { validate = "true" }
  }

  const HandleAddCategory = () => {
    validateCategory()
    if (validate == "true") {
      let temp = {
        Category: inputCategory.Category,
        id: uuidv4(),
      };
      allCategory.push(temp);
      setAllCategory(allCategory);
      localStorage.setItem("Category", JSON.stringify(allCategory));
      setInputCategory({
        Category: ""
      })
      validate = "false"
    }
  };

  const HandleDeletCatagury = (id) => {
    let temp = allCategory.filter((e) => {
      return e.id !== id;
    });
    setAllCategory(temp);

    localStorage.setItem(
      "Category",
      JSON.stringify(temp)
    );
  };

  const handleEditProduct = (id) => {
    let edit = Product.find((el) => { return (el.id === id) })
    setAddProduct(edit)
    setPage("add")
  };

  const handleDeletProduct = (id) => {
    let temp = Product.filter((e) => {
      return e.id !== id;
    });

    setProduct(temp);

    localStorage.setItem(
      "Product",
      JSON.stringify(temp)
    );
  };

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

        </ul>
      </div>

      {/* Main Content */}
      <div className="content">

        {/* Home */}
        {page === "home" && (
          <div className="section">
            <h2>Home</h2>
            <p>Welcome to the admin dashboard.</p>
          </div>
        )}

        {/* Add Product */}
        {page === "add" && (
          <div className="section">

            <h2>Add New Product</h2>

            <input
              type="text"
              name="Product"
              placeholder="Product Name"
              value={addProduct.Product}
              onChange={(e) => {
                HandelInput(e);
              }}
            />

            <input
              type="text"
              name="description"
              placeholder="description"
              value={addProduct.description}
              onChange={(e) => {
                HandelInput(e);
              }}
            />

            <input
              type="text"
              name="Price"
              placeholder="Price"
              value={addProduct.Price}
              onChange={(e) => {
                HandelInput(e);
              }}
            />

            <input
              type="text"
              name="Inverntry"
              placeholder="Inverntry"
              value={addProduct.Inverntry}
              onChange={(e) => {
                HandelInput(e);
              }}
            />

            <select
              value={addProduct.Category}
              name="Category"
              onChange={(e) => {
                HandelInput(e);
              }}
            >
              <option value="">
                Select Category
              </option>

              {allCategory.map((e, index) => {
                return (
                  <option
                    value={e.Category}
                    key={index}
                  >
                    {e.Category}
                  </option>
                );
              })}
            </select>

            <button onClick={HandelAddProductbut}>
              Add Product
            </button>

          </div>
        )}

        {/* Category */}
        {page === "category" && (
          <div className="section">

            <h2>Add New Category</h2>

            <div className="category-form">

              <div className="form-group">

                <label>
                  Category Name
                </label>

                <input
                  type="text"
                  name="Category"
                  placeholder="Enter category name"
                  value={inputCategory.Category}
                  onChange={(e) =>
                    HandleCategoryInput(e)
                  }
                />

              </div>

              <button onClick={HandleAddCategory}>
                Add Category
              </button>

            </div>

            {/* Already Added Categories */}
            <div className="category-list">

              <h2>
                Already Added Categories
              </h2>

              <div className="category-items">

                {allCategory.map((e, index) => {
                  return (
                    <div
                      className="category-item"
                      key={index}
                    >

                      <span>
                        {e.Category}
                      </span>

                      <button
                        onClick={() => {
                          HandleDeletCatagury(e.id);
                        }}
                      >
                        Delete
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* Inventory */}
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

                {Product.map((el, index) => {
                  return (
                    <tr key={index}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {el.Product}
                      </td>

                      <td>
                        {el.description}
                      </td>

                      <td>
                        {el.Price}
                      </td>

                      <td>
                        {el.Inverntry}
                      </td>

                      <td>
                        {el.Category}
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            handleEditProduct(el.id);
                          }}
                        >
                          Edit
                        </button>
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            handleDeletProduct(el.id);
                          }}
                        >
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

      </div>
    </div>
  );
}

export default AdminPage;