import React, { useEffect, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/slices/userSlice";

/**
 * Auth - Authentication page component.
 * Toggles between "login" and "signup" views.
 * Users are stored in localStorage under the "Users" key.
 * Admin user (admin@admin.com) is redirected to the admin panel on login.
 */
function Auth() {
  const [page, setPage] = useState("login");
  const user = useSelector((state) => state.user);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect to homepage if the user is already logged in
  useEffect(() => {
    if (user.id !== "") {
      navigate("/");
    }
  }, [user.id, navigate]);

  /** Update form state when any input field changes */
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  /** Validate form fields based on the current page (login vs signup) */
  const validation = () => {
    if (inputData.name === "" && page === "signup") { toast("Enter Name"); return false; }
    else if (inputData.email === "") { toast("Enter Email"); return false; }
    else if (inputData.password === "") { toast("Enter Password"); return false; }
    else if (inputData.confirmPassword === "" && page === "signup") { toast("Enter Confirm Password"); return false; }
    // Bug 1 fix: check that password and confirmPassword match
    else if (inputData.password !== inputData.confirmPassword && page === "signup") { toast("Passwords do not match"); return false; }
    else { return true; }
  };

  /** Handle login or signup form submission */
  const handleSubmit = () => {
    let valid = validation();

    // --- Signup flow ---
    if (page === "signup") {
      if (valid === true) {
        const users = JSON.parse(localStorage.getItem("Users")) || [];

        // Check if a user with this email already exists
        let emailExists = users.some((el) => el.email === inputData.email);

        if (emailExists) {
          toast("User already exists");
        } else {
          // Bug 2 fix: only store necessary fields (exclude confirmPassword)
          const newUser = {
            name: inputData.name,
            email: inputData.email,
            password: inputData.password,
            id: uuidv4(),
          };
          users.push(newUser);
          localStorage.setItem("Users", JSON.stringify(users));

          // Auto-login the newly registered user
          dispatch(
            loginUser({
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
            })
          );
          navigate(`/?id=${newUser.id}`);
        }
      }
    }

    // --- Login flow ---
    if (page === "login") {
      if (valid === true) {
        const users = JSON.parse(localStorage.getItem("Users")) || [];

        // Find the user matching the entered email
        const matchedUsers = users.filter((el) => el.email === inputData.email);

        // Bug 9 fix: removed redundant second email check (filter already guarantees match)
        if (matchedUsers.length > 0) {
          if (matchedUsers[0].password === inputData.password) {
            // Redirect admin to the admin panel
            if (matchedUsers[0].email === "admin@admin.com") {
              navigate(`/admin/?email=${matchedUsers[0].email}`);
            } else {
              // Login regular user via Redux
              dispatch(
                loginUser({
                  id: matchedUsers[0].id,
                  name: matchedUsers[0].name,
                  email: matchedUsers[0].email,
                })
              );
              navigate(`/?id=${matchedUsers[0].id}`);
            }
          } else {
            toast("Enter Valid Password");
          }
        } else {
          toast("User not Found");
        }
      }
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        {/* Login Form */}
        {page === "login" && (
          <div>

            <h2>Login</h2>

            {/* Bug 6 fix: all inputs are now controlled via value={inputData.field} */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={inputData.email}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={inputData.password}
                onChange={handleInput}
              />
            </div>

            <button onClick={handleSubmit}>Login</button>

            <p>
              Don't have an account?
              <span onClick={() => {
                setPage("signup");
                setInputData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}>
                {" "}Sign Up
              </span>
            </p>

          </div>
        )}

        {/* Signup Form */}
        {page === "signup" && (
          <div>

            <h2>Sign Up</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={inputData.name}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={inputData.email}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={inputData.password}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={inputData.confirmPassword}
                onChange={handleInput}
              />
            </div>

            <button onClick={handleSubmit}>Sign Up</button>

            <p>
              Already have an account?
              <span onClick={() => {
                setPage("login");
                setInputData({
                  email: "",
                  password: "",
                });
              }}>
                {" "}Login
              </span>
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Auth;