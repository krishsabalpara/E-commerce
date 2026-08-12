import React, { useState } from "react";
import "./login.css"
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

function Auth() {
  const [page, setPage] = useState("login");
  const [inPutData, setInPutData] = useState(
    page === "login" ? {
      email: "",
      password: ""
    } : {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  )
  const navigate = useNavigate()

  const HandleInput = (e) => {

    setInPutData({
      ...inPutData,
      [e.target.name]: e.target.value
    })
  }

  const validation = () => {
    if (inPutData.name === "" && page === "signup") { toast("Enter Name"); return false }
    else if (inPutData.email === "") { toast("Enter Email"); return false }
    else if (inPutData.password === "") { toast("Enter Password"); return false }
    else if (inPutData.confirmPassword === "" && page === "signup") { toast("Enter Confirm Password"); return false }
    else { return true }
  }

  const HandleButton = () => {
    let valid = validation()

    if (page === "signup") {
      if (valid === true) {
        const users = JSON.parse(localStorage.getItem("Users")) || [];

        let Chaker = users.map((el) => {
          return el.email === inPutData.email;
        })


        if (Chaker.includes(true)) {
          toast("User already exiest");
        } else {
          const temp = {
            ...inPutData,
            id: uuidv4()
          }
          users.push(temp)
          localStorage.setItem("Users", JSON.stringify(users))
        }

      }
    }

    if (page === "login") {

      if (valid === true) {
        const users = JSON.parse(localStorage.getItem("Users")) || [];

        const temp = users.filter((el) => {
          return el.email === inPutData.email
        })

        if (temp.length > 0) {
          if (temp[0].email === inPutData.email) {
            if (temp[0].password === inPutData.password) {
              if(temp[0].id === "bd876462-13e2-409b-9ae4-d8fd0310b3c5"){
                navigate(`/admin/?id=${temp[0].id}`)
              }
            } else {
              toast("Enter Valid Password")
            }
          }
        } else {
          toast("User not Found")
        }
      }

    }
  }

  //   ```jsx
  // const HandleButton = () => {
  //   let valid = validation();

  //   if (valid === true) {
  //     const users = JSON.parse(localStorage.getItem("Users")) || [];

  //     let Chaker = users.map((el) => {
  //       return el.email === inPutData.email;
  //     });

  //     if (Chaker.includes(true)) {
  //       toast("User already exists");
  //     } else {
  //       users.push(inPutData);
  //       localStorage.setItem("Users", JSON.stringify(users));
  //     }
  //   }
  // };
  // ```


  return (
    <div className="auth-container">

      <div className="auth-box">

        {page === "login" && (
          <div>

            <h2>Login</h2>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => { HandleInput(e) }}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => { HandleInput(e) }}
              />
            </div>

            <button onClick={HandleButton}>Login</button>

            <p>
              Don't have an account?
              <span onClick={() => {
                setPage("signup")
                setInPutData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: ""
                })
              }}>
                {" "}Sign Up
              </span>
            </p>

          </div>
        )}

        {page === "signup" && (
          <div>

            <h2>Sign Up</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => { HandleInput(e) }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => { HandleInput(e) }}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => { HandleInput(e) }}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => { HandleInput(e) }}
              />
            </div>

            <button onClick={HandleButton}>Sign Up</button>

            <p>
              Already have an account?
              <span onClick={() => {
                setPage("login")
                setInPutData({
                  email: "",
                  password: ""
                })
              }}>
                {" "}Login
              </span>
            </p>

          </div>
        )}

      </div>

    </div >
  );
}

export default Auth;