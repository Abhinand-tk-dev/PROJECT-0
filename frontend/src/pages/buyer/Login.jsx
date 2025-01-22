import React, { useState } from "react";
import "./Login.css";
import Navbar from "../../components/Navbar";
import Axios from "axios";

function Login() {
  return (
    <>
 <div className="containers">
  <div className="login-forms">
    <div className="login-form-fields">
      <div className="login-input-groupnew">
        <div className="name-password-login-buttonnew">
          {/* User Icon */}
          <form>
            {/* Name Field */}
            <div className="name">
            
              <input
                type="text"
                name="user-name"
                id="user-name"
                placeholder=" Email"
              />
            </div>
            {/* Password Field */}
            <div className="password">

              <input
                type="password"
                name="password"
                id="user-password"
                placeholder="Password"
              />
            </div>
            {/* Login Button Field */}
            <div className="login-btn">
              <button type="submit">Log In</button>
            </div>
          </form>
          {/* Forget Password and Sign Up Field */}
          <div className="forget-password-sign-up-container">
            <div className="forget-password">
              <a href="#">Forget Password?</a>
            </div>
            <div className="sign-up">
              <a href="#">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Login;
