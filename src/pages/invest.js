import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import "../../docs/app.css";
import axios from "axios";
import "../../docs/app.css";
import Topbar from "./top";
import { Button, Modal, Div,Icon, Input ,Text} from "atomize";
import { BankIcon, Greendot, Hold, Reddot, Yellowdot } from "./svg";




function Invest (){
 
  const [mytotal, setTotal] = useState();
  const [classId, setClassId] = useState();
  const [myClass, setMyclass] = useState();
const [transactionData, setTransactionData] = useState([]);
 const [UserEmail, setUserEmail] = useState("");
  const [amount, setAmount] = useState("");
   const [wallet, setWallet] = useState("");
   const [FundEmail, setFundEmail] = useState("");
const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Yes, invest";
  const [myText, setText] = useState("");
  const [buttonText, setButtonText] = useState(myOriginal);
 const [showModal, setShowModal] = useState(false);
useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    setFundEmail(loginData.email);
    const homeData = JSON.parse(localStorage.getItem("homeData"));
   setWallet(homeData.totalWallet);
   const fetchData = async () => {
          try {
        const response = await axios.post(
          "https://fund.cyanase.com/fund/investor.php",
          {
            email: FundEmail,
          }
        );
 

setTransactionData(response.data);
        // Check the response from fund_login.php

      } catch (error) {
        console.error(error);
        // Handle error case
      }
}
fetchData();
  }, []);
  
  const Investor = () => {

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleInvest = async () => {
  setButtonText(myChange);
console.log(mytotal)
  try {
    const response = await axios.post(
      "https://fund.cyanase.com/fund/invest_money.php",
      {
        class_id: classId,
        amount: mytotal,
      }
    );

    console.log("*response", response.data);
    if(response.data.success==='true'){
    
    setButtonText("Done!");
    setShowModal(false)
    }{
      
    }
    
    // Check the response from fund_login.php

  } catch (error) {
    console.error(error);
    // Handle error case
  }
};
//// handle use deposit
 
  

  return (
    <>
      
      <Modal isOpen={showModal} onClose={handleCloseModal} align="center" rounded="md">
        <Icon
          name="Cross"
          pos="absolute"
          top="1rem"
          right="1rem"
          size="16px"
          onClick={handleCloseModal}
          cursor="pointer"
        />
        <Div d="flex" align="center" textAlign="left">
          <Icon
            name="InfoSolid"
            color="warning700"
            m={{ t: "0.35rem", r: "0.5rem" }}
          />
          <Text p={{ l: "0.5rem", t: "0.5rem" }} textSize="heading">
            Investment 
          </Text>
        </Div>
        
 
         <Div d="flex" textALign="left">
         <span style={{ fontSize:"20px", color:"#252859"}}>Would you like to make a transfer of {mytotal} 
         {""} and procedd to invest in {myClass} </span>
         
         </Div>
<Div d="flex" align="flex-end">
<Button
onClick={() => {
      handleInvest(); }}
>{buttonText}</Button>

        </Div>
      </Modal>
    </>
  );
};

const handleDeposit = async (e) => {
    e.preventDefault();
setText("");
    // Validate email and amount
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(UserEmail)) {
      setText("Please enter a valid email address.");
      return;
    }

    if (!amount || amount <= 0) {
      setText("Please enter a valid amount.");
      return;
    }

    // Calculate 1% of the amount
    const fee = parseInt(amount) * 0.01;
    // Perform wallet balance check
    
    const walletBalance = parseInt(wallet)-parseInt(fee);

    if (fee > wallet) {
      setText("Insufficient funds in the wallet.");
      return;
    }
 setButtonText(myChange);
    const data = {
      FundEmail,
      UserEmailmail,
      amount: parseFloat(amount),
      walletBalance: walletBalance,
    };

    try {
      // Make axios request to submit the data
      const response = await axios.post("https://fund.cyanase.com/fund/add_deposit.php", data);
      console.log(response.data); // Handle the response as needed
      if(response.data.status==="success"){
        setButtonText(myOriginal);
        const homeData = JSON.parse(localStorage.getItem('homeData'));
        const updatedLoginData = { ...homeData };
updatedLoginData.tata = walletBalance;
localStorage.setItem('homeData', JSON.stringify(updatedLoginData));

        
      }
    } catch (error) {
      console.error(error);
      setButtonText(myOriginal)
    }
  };
    return(
<>
  <main className="main-content main-content-side">
        <Topbar />
                <div className="bottom-container">
          <div className="bottom-container__left">
    <div className="box transaction-box">
              <div className="header-container">
                <h3 className="section-header"> Investment request</h3>
                <div className="date-selector">
                  <span>1 Jan - 1 Feb 2022</span>
                </div>
              </div>
              <table className="transaction-history">
                <thead>
                  <tr>
                    <th>Product</th>
                   
                    <th>
                      Amount
                      
                    </th>
                    <th>
                    total requests
                    </th>
         
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr key={index}>
                      <td>
                        <BankIcon />
                        {transaction.investment_name}
                      </td>
                    
                      <td>{transaction.total_deposits}</td>
                     <td>
                     {transaction.deposit_count}
                     </td>
                     <td>
                       <Button
                          h="2rem"
                          p={{ x: "0.75rem" }}
                          textSize="caption"
                          textColor="info700"
                          hoverTextColor="info900"
                          bg="white"
                          hoverBg="info200"
                          border="1px solid"
                          borderColor="info700"
                          hoverBorderColor="info900"
                          m={{ r: "0.5rem" }}
                          onClick={() => {
                            setShowModal(true); 
                            setTotal(transaction.total_deposits);
                            setMyclass(transaction.investment_name);
                            setClassId(transaction.class_id)
                            
                          }}
                        >
                          Invest
                        </Button>
                        {showModal && (
                          <Investor
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                          />
                        )}
                     </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            </div>
            {/*****Add investor*******/}
             <div className="box transaction-box">
              <div className="header-container">
                <h3 className="section-header"> Investment deposit</h3>
              </div>
<p style={{color:"red"}}>{myText}</p>
             {/*****Add user deposit******/}
             
             <Div d="flex" align="center">
             <Div p="0.5rem">
             <Input type ="email"placeholder="Enter email"
             onChange={(e) => setUserEmail(e.target.value)}/>
             </Div>
             <Div p="0.5rem">
             <Input type="number" placeholder="Enter amount"
             onChange={(e) => setAmount(e.target.value)}/>
             </Div>
             </Div>
             <Button onClick={handleDeposit}
             >{buttonText}</Button>
             
            </div>
            </div>
</main>
</>




    )
}
export default Invest