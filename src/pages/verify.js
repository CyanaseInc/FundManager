import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../docs/login.css";
import { Input, Div, Image, Icon, Container, Button,Text } from "atomize";


function Verify() {
 
  const [Code, setCode] = useState();
    const [InputCode, setInputCode] = useState();
  const [email, setEmail] = useState('');
  useEffect(() => {
    const MyCode = JSON.parse(localStorage.getItem("Code"));


    setCode(MyCode?.code);


  }, []);

  useEffect(() => {
    const fff = JSON.parse(localStorage.getItem("email"));
 
    setEmail(fff.email);



  }, []);
  
  const [errorMessage, setErrorMessage] = useState('');
  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Continue";
  const [myText, SetText] = useState("Verification");
  const [buttonText, setButtonText] = useState(myOriginal);
  
  const handleChange = (e) => {
    setInputCode(e.target.value);
  };
const handleSubmit = async (e) => {
 e.preventDefault();
    
 

    if (parseInt(InputCode) === parseInt(Code)) {
      setButtonText(myChange);
      const EMAIL_PATH = 'https://fund.cyanase.com/fund/verify.php';
      axios({
        method: 'POST',
        url: `${EMAIL_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: { email: email, type: "fund" }
      })
        .then(result => {
console.log(result.data)
          const state = result.data.message;

          if (state === "verified") {

            window.location.href = '/login';

          }
        })
        .catch(error => console.log(error));

    } else {

      
      setErrorMessage("Invalid code");

    }
    
  }
  
function Resend(){

    SetText("Resending...");
    const EMAIL_PATH = 'https://cyanase.com/savers/email/fund_verify.php';
    axios({
      method: 'POST',
      url: `${EMAIL_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {email:email,code:Code}
  })
      .then(results => {

          console.log(results.data);
          SetText("Code sent!");

      })
      .catch(error =>{

          
          SetText("Check your internet connection");
          setButtonText(myOriginal);
          console.log(error.data);

      } );
    
  }
  return (
    <div className='div'>
      <form className='form'onSubmit={handleSubmit}>
        <img width='200' src="/image/logo.png"/>
        <h2 className='head1'>{myText}</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <p> Verification code was sent to {email}, kindly check your inbox or spam folder to continue </p>
        <input
          placeholder='Enter code'
          type="text"
          name="code"
          className='myinput'
          onChange={handleChange} 
  
        />
      
      
        <button className='button' type="submit">{buttonText}</button>
           <Text   onClick={()=>Resend()} textAlign="center" textColor="#252859">
            Resend code?
          </Text>
      </form>
    </div>
  );
}

export default Verify;
