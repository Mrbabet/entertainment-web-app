import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-input" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-input" required />
      </div>
      <button type="submit" className="button">
        Login to your account
      </button>
      <p>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </form>
  );
};

export default Login;
