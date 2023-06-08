import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../docs/login.css";
import { Input, Div, Image, Icon, Container, Button } from "atomize";
function Verify() {
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

  

  const handleSubmit = async (e) => {
    e.preventDefault();
setButtonText(myChange);
    // Input validation
    if (!companyName || !email || !phoneNumber || !password) {
      setErrorMessage('Please fill in all fields.');
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
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during signup.');
    }
  };

  return (
    <div className='div'>
      <form className='form' onSubmit={handleSubmit}>
        <img width='200' src="/image/logo.png"/>
        <h2 className='head1'>verification</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <input
          placeholder='Enter code'
          type="text"
          className='myinput'
          value={companyName}
          onChange={handleCompanyNameChange}
        />
      
      
        <button className='button' type="submit">{buttonText}</button>
     
      </form>
    </div>
  );
}

export default Verify;
