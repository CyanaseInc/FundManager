import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../docs/login.css";
import { Input, Div, Image, Icon, Container, Button } from "atomize";
function Signup() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Continue";
  const [myText, SetText] = useState("Add details to login");
  const [buttonText, setButtonText] = useState(myOriginal);
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setButtonText(myChange);
    // Input validation
    if (!companyName || !email || !phoneNumber || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Email pattern validation
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    // Make a POST request to signup.php
    try {
      const response = await axios.post('http://localhost/cyanase/fund_signup.php', {
        companyName,
        email,
        phoneNumber,
        password,
      });

      const data = response.data;

      // Check the response from signup.php
      if (data.signup === 'success') {
        // Redirect to verification page
        window.location.href = '/verification';
      } else {
        console.log(response.data)
        setErrorMessage(data.signup);
        setButtonText(myOriginal);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(data.signup);
      setButtonText(myOriginal)
    }

  };

  return (
    <div className='div'>
      <form className='form' onSubmit={handleSubmit}>
        <img width='200' src="/image/logo.png"/>
        <h2 className='head1'>Admin Signup</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <input
          placeholder='Company Name'
          type="text"
          className='myinput'
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <input
          placeholder='Email'
          type="text"
          className='myinput'
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder='Phone Number'
          type="text"
          className='myinput'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <input
          placeholder='Password'
          className='myinput'
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className='button' type="submit">{buttonText}</button>
        <p className='mytext'>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
}

export default Signup;
