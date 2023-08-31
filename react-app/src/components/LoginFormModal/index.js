import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //backend errors
  const [errors, setErrors] = useState([]);
  //frontend errors
  const [errorObject, setErrorObject] = useState({})
  const { closeModal } = useModal();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);

  useEffect(()=> {
    const errorObj = {};
    if (!email.length) errorObj["email"] = "Email can't be blank";
    if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";
    console.log(errorObject)
    console.log(submitted)
    
    if (submitted) {
      setErrorObject(errorObj)
    }
  }, [email, password, submitted])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    console.log(errorObject)
    if(!Object.values(errorObject).length){
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      } else {
          closeModal()
          history.push('/');

      }
    }
    
  };

  const loginDemo = (e) => {
    e.preventDefault();
    
    dispatch(login('demo@aa.io', 'password')).then(closeModal()).then(history.push('/'))
  }

  return (
    <div className="login-outer-box">
    <div className="login-box">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li className='errors'>
            {errorObject.email}
          </li>
          <li className='errors'>
            {errorObject.password}
          </li>
          {errors.map((error, idx) => (
            <li className='errors' key={idx}>{error.split(':')[1]}</li>
          ))}
        </ul>
        <label>
          <input
            className="input"
            placeholder="Email"
            type="email"
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
