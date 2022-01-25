/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";

const SignupForm = () => {

    //setting up state for the email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //handling the changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="form-group">
      <form>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={handleEmail} type="email" className="form-control" id="email" value={email}placeholder="name@example.com" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={handlePassword} type="password" className="form-control" id="password" value={password}placeholder="Password" />
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};


export default SignupForm;