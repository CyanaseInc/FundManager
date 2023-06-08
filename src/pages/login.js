import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../docs/login.css";
import { Input, Div, Image, Icon, Container, Button } from "atomize";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Login";
  const [myText, SetText] = useState("Add details to login");
  const [buttonText, setButtonText] = useState(myOriginal);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setButtonText(myChange)
    // Input validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    // Make a POST request to fund_login.php
    try {
      const response = await axios.post('http://localhost/cyanase/fund_login.php', {
        email,
        password,
      });

      const data = response.data;

      // Check the response from fund_login.php
      if (data.login === 'success') {
        // Redirect to dashboard
        localStorage.setItem("loginData", JSON.stringify(response.data));
        window.location.href = '/dashboard';
      } else {
        setButtonText(myOriginal)
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className='div'>
      <form className='form' onSubmit={handleSubmit}>
        <img width='200' src="/image/logo.png"/>
        <h2 className='head1'>Admin Login</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <input placeholder='Email' type="text" className='myinput' value={email} onChange={handleEmailChange} />
        <input placeholder='Password' className='myinput' type="password" value={password} onChange={handlePasswordChange} />
        <p className='mytext'>Forgot password?</p>
        <button className='button' type="submit">{buttonText}</button>
        <p className='mytext'>Don't have an account? <Link to="/signup">Create fund account</Link></p>
      </form>
    </div>
  );
}

export default Login;
