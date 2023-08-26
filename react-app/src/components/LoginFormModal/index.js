import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password')).then(closeModal())
  }

  return (
    <div className="login-outer-box">
    <div className="login-box">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className='errors' key={idx}>{error.split(':')[1]}</li>
          ))}
        </ul>
        <label>
          <input
            className="input"
            placeholder="Username or Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        <button id="login-button" className='button-orange' type="submit">Log In</button>
        <button id="login-demo" className='button-orange' onClick={loginDemo} >Demo User</button>
      </form>
      </div></div>
  );
}

export default LoginFormModal;
