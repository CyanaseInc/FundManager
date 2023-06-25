import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../docs/login.css";
import { Input, Div, Image, Icon, Container, Button } from "atomize";
import countryPhoneCodes from './country'; // Import the countryPhoneCodes from countries.js
function Signup() {
  

  const [country, setCountry] = useState('');
  const [phoneCode, setPhoneCode] = useState('+256');
  const [myCountryCode, setCallerCountryCode] = useState('');
  
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const matchingCode = countryPhoneCodes.find(
      (item) => item.country === selectedCountry
    );
    if (matchingCode) {
      setCallerCountryCode(matchingCode.countryCode)
      setCountry(selectedCountry);
      setPhoneCode(matchingCode.code);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const enteredPhoneNumber = e.target.value;
    const enteredCode = enteredPhoneNumber.slice(0, 4); // Assuming the phone code is the first 4 characters
    const matchingCountry = countryPhoneCodes.find(
      (item) => item.code === enteredCode
    );
    if (matchingCountry) {
      setCountry(matchingCountry.country);
      setPhoneCode(matchingCountry.code);
      setPhoneNumber(enteredPhoneNumber.slice(4)); // Set the phone number without the code
    } else {
      setCountry('');
      setPhoneCode('');
      setPhoneNumber(enteredPhoneNumber);
    }
  };

  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const completePhoneNumber = `${phoneCode}${phoneNumber}`;

    // Input validation
    if (!companyName || !email || !phoneNumber || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setButtonText(myChange);

    // Email pattern validation
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    // Make a POST request to signup.php
    try {
      const response = await axios.post('https://fund.cyanase.com/fund/fund_signup.php', {
        companyName,
        email,
        completePhoneNumber,
        password,
        myCountryCode,
      });

      const data = response.data;
      // Generate verification code
      const code = Math.round(Math.random() * (900000 - 99999) + 1000);
      const MyCode = { "code": code };
      localStorage.setItem('Code', JSON.stringify(MyCode));

      // Check the response from signup.php
      if (data.signup === 'success') {
        // Redirect to verification handleCompanyNameChange
        const EMAIL_PATH = 'https://cyanase.com/savers/email/fund_verify.php';
        axios({
          method: 'POST',
          url: `${EMAIL_PATH}`,
          headers: { 'content-type': 'application/json' },
          data: { email: email, code: code }
        })
          .then(results => {
            setButtonText(myOriginal);
            window.location.href = '/verification';
          })
          .catch(error => {
            setError("yes");
            SetText("Check your internet connection");
            setButtonText(myOriginal);
            console.log(error.data);
          });

        const myEmailz = { 'email': email };
        localStorage.setItem('email', JSON.stringify(myEmailz));
      } else {
        console.log(response.data);
        setErrorMessage(data.signup);
        setButtonText(myOriginal);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(data.signup);
      setButtonText(myOriginal);
    }
  };

  return (
    <div className='div'>
      <form className='form' onSubmit={handleSubmit}>
        <img width='200' src="/image/logo.png" alt="Logo" />
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
        <div>
        
          <select id="country" className ="myinput"
          value={country} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countryPhoneCodes.map((item) => (
              <option key={item.country} value={item.country}>
                {item.country}
              </option>
            ))}
          </select>
        </div>
        <div>
          
          <input className="myinput"
            type="text"
            id="phoneNumber"
            value={phoneCode + phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
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
