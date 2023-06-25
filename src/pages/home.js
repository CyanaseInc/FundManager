import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Link } from "react-router-dom";
import "../../docs/app.css";
import Topbar from "./top";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, Icon,Input, Switch,Label, Modal, Div, Text, Row, Col } from "atomize";
import {
  ArrowDown,
  ArrowUp,
  BankIcon,
  Reddot,
  Yellowdot,
  Greendot,
} from "./svg";
/// Modal chages/update
const rowColors = ["#f8f8f8", "#e9e9e9", "#f1f1f1"]; // Define your desired colors here
//// status dots
function StatusDot({ status }) {
  let dotComponent;

  switch (status) {
    case "0":
      dotComponent = <Greendot />;
      break;
    case "2":
      dotComponent = <Yellowdot />;
      break;
    case "1":
      dotComponent = <Reddot />;
      break;
    default:
      dotComponent = null;
  }

  return dotComponent;
}
//sataus icon
function StatusIcon({ status }) {
  let dotComponent;

  switch (status) {
    case "UGXBOND":
      dotComponent = <BankIcon />;
      break;
    case "UGXSTOCK":
      dotComponent = <Yellowdot />;
      break;
    case "UGXBILL":
      dotComponent = <Reddot />;
      break;
    default:
      dotComponent = null;
  }

  return dotComponent;
}

const Home = (isOpen, onClose) => {
  const [transactionData, setTransactionData] = useState([]);
  const [myClasses, setClasses] = useState([]);
  const [increasePercentage, setIncreasePercentage] = useState(70);
  const [decreasePercentage, setDecreasePercentage] = useState(50);
  const [Wallet, setWallet] = useState("0.00");
  const [deposit, setDeposit] = useState("0.00");
  const [Withdraw, setWithdraw] = useState("0.00");
  const [showModal, setShowModal] = useState(false);
  const [myClassID, setClassID] = useState(false);
  const [myClassName, setClassName] = useState("");
  const [myValue, setValue] = useState(false);
  const [FundEmail, setFundEmail] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [moreInfo, setMoreInfo] = useState(false);
  
    const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "send updates";
  const [myText, SetText] = useState("");
  const [buttonText, setButtonText] = useState(myOriginal);
  const [WbuttonText, setWButtonText] = useState("Authorize");
  ///get user data
  useEffect(() => {
    const fetchData = async () => {
      const loginData = JSON.parse(localStorage.getItem("loginData"));
 setFundEmail(loginData.email);
      try {
        const response = await axios.post(
          "https://fund.cyanase.com/fund/fund_home.php",
          {
            email: loginData.email,
          }
        );

        const data = response.data;
       
        setWallet(response.data.totalWallet);
        setDeposit(response.data.totalDeposit);
        setWithdraw(response.data.totalWithdraw);
        setTransactionData(response.data.investmentPerformace);
        
        // Check the response from fund_login.php
        if (data.login === "success") {
          // Redirect to dashboard
          localStorage.setItem("homeData", JSON.stringify(response.data));

          // Replace this with your actual logic to calculate the increase and decrease
          const lastWeekValue = 300;
          const currentWeekValue = 6000;

          const increase =
            ((currentWeekValue - lastWeekValue) / lastWeekValue) * 100;
          const decrease = -increase;

          setIncreasePercentage(increase);
          setDecreasePercentage(decrease);
        } else {
         
        }
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchData();
  }, []);
  //////Authorize withdraws
  
const handleWithdraw = () => {
  setWButtonText(myChange);
  
if (Wallet < Withdraw) {
      alert('Insufficient balance');
      setWButtonText('Authorize');
      return;
    }
  const requestData = {
    withdrawAmount: Withdraw,
    userType: 'fund_manager',
    email: FundEmail
  };

  // Added for debugging

  try {
    axios
      .post('https://payments.cyanase.com/fund_withdraw.php', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        
        if(response.data.canWithdraw===true){
          
        setWButtonText("Authorize");
        alert ("done")
        
        }
        
        // Handle the response from the withdraw API
        // You can perform further actions based on the response
      })
      .catch(error => {
        console.error('Error making withdraw request:', error);
      })
      .finally(() => {
        setButtonText('Authorize');
      });
  } catch (error) {
    console.error('Error in handleWithdraw:', error);
  }
};


  
  /// INVESTOR UPDATE MODAL
const Rem4FromTopModal = ({ isOpen, onClose }) => {
  const [newValue, setNewValue] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };
const [amount, setAmount] = useState("");

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleTextFormat = (format) => {
    const quill = document.querySelector(".email-body .ql-editor");
    const selection = quill.getSelection();
    const selectedText = quill.getText(selection.index, selection.length);

    let modifiedText;

    switch (format) {
      case "bold":
        modifiedText = `<strong>${selectedText}</strong>`;
        break;
      case "italic":
        modifiedText = `<em>${selectedText}</em>`;
        break;
      case "paragraph":
        modifiedText = `<p>${selectedText}</p>`;
        break;
      default:
        modifiedText = selectedText;
    }

    quill.insertHTML(selection.index, modifiedText);
  };
/// pay Intrest handle
  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };
  /// make a post request for pay Intrest
  const handlePayInterest = () => {
    SetText("");
    // Validate input
    if (!/^\d+$/.test(amount)) {
      SetText("Please enter a valid number.");
      return;
    }

    const parsedAmount = parseInt(amount, 10);

    // Check for insufficient balance
    if (Wallet < parsedAmount) {
      SetText("Insufficient balance.");
      return;
    }

    // Make a post request to withdraw.php with the amount
    // Replace the URL and adjust the request as needed
    axios
      .post("https://fund.cyanase.com/fund/withdraw.php", { amount: parsedAmount, class_id:myClassID, email:FundEmail })
      .then((response) => {
        // Handle the response data as needed
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submitting
    if (!newValue || !emailSubject || !emailBody || !attachment) {
      alert("Please fill in all fields and attach a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("currentValue", currentValue);
formData.append("newValue", newValue);
    formData.append("emailSubject", emailSubject);
    formData.append("emailBody", emailBody);
    formData.append("attachment", attachment);
    formData.append("fundemail",FundEmail );
formData.append("class_id", myClassID);
    try {
      setButtonText(myChange);
      // Send data using Axios
      const response = await axios.post("https://cyanase.com/savers/email/investor_update.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("results:"+response.data);
const Updatestatus  = response.data.status;

if (Updatestatus===100){
  
setButtonText(myOriginal)
alert("Updates sent")
  
}
      // Handle response as needed
      

      // Close the modal
      onClose();
    } catch (error) {
      setButtonText(myOriginal);
      console.error(error);
    }
  };
////Pay intres switch

const [selectedSwitchValue1, setSelectedSwitchValue1] = useState(false);

  const handleSwitchToggle = () => {
    setSelectedSwitchValue1(!selectedSwitchValue1);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      m={{ y: "4rem", x: { xs: "1rem", lg: "auto" } }}
      rounded="md"
      bg="#f5f6fa"
    >
      <Icon
        name="Cross"
        pos="absolute"
        top="1rem"
        right="1rem"
        size="16px"
        onClick={onClose}
        cursor="pointer"
      />
      <Div d="flex">
        <h4>Investment Updater</h4>
      </Div>
      <Text textAlign="left">Send updates to people investing with you </Text>
      <Div m={{ t: "1rem" }} d="flex" align="center">
        <h4>{myClassName}</h4>
      </Div>
      <form onSubmit={handleSubmit}>
        <Div d="flex">
          <Input
            type="text"
            value={currentValue}
            onChange={(e) => handleInputChange(e, setNewValue)}
            className="field_input-field"
            placeholder="Current value"
          />
          <Input
            type="number"
            value={newValue}
            onChange={(e) => handleInputChange(e, setNewValue)}
            className="field_input-field"
            placeholder="New value"
          />
        </Div>
        <br></br>
        <Text textAlign="left">Send email to update investors</Text>
        <Div>
          <Input
            type="text"
            value={emailSubject}
            onChange={(e) => handleInputChange(e, setEmailSubject)}
            className="field_input-field"
            placeholder="Email subject"
          />
        </Div>
        <Div>
          <ReactQuill
            value={emailBody}
            onChange={setEmailBody}
            className="email-body field_input-field"
            placeholder="Enter text"
          />
        </Div>
        <Div>
          {attachment && <div>Selected File: {attachment.name}</div>}
                  <br></br>
<Text textAlign="left">Attach fact sheet in PDF</Text>
          <input
            type="file"
         
            accept="application/pdf"
            onChange={handleAttachmentChange}
            
          />
        </Div>
        <Div m={{ t:"0.5rem"}}>
          <Button w="100%" type="submit" bg="#252859">
            {buttonText}
          </Button>
        </Div>
      </form>
      
      <Div p= "0.5rem" m={{t:"1rem"}}>
        <Label
      onClick={handleSwitchToggle}
      align="center"
      textWeight="600"
      m={{ b: "1rem" }}
    >
      <Switch checked={selectedSwitchValue1} />
      Pay out Intrest to customers
    </Label>
    
<Text textAlign="left" style={{color:"red"}}>{myText}</Text>
    {selectedSwitchValue1 && (
    <>
          <Input
      placeholder="Enter amount"
      type="number"
      onChange={handleAmountChange}
      suffix={
        <Button
          pos="absolute"
         onClick={handlePayInterest}
          bg="info700"
          hoverBg="info800"
          top="0"
          right="0"
          rounded={{ r: "md" }}
        >
          Pay Intrest 
        </Button>
      }
    />
    </>
     )}
      </Div>
    </Modal>
  );
};
///More investmentPerformace
const MoreInfo = () => {

  const handleCloseModal = () => {
    setMoreInfo(false);
  };

  return (
    <>
      
      <Modal isOpen={moreInfo} onClose={handleCloseModal} align="center" rounded="md">
        <Icon
          name="Cross"
          pos="absolute"
          top="1rem"
          right="1rem"
          size="16px"
          onClick={handleCloseModal}
          cursor="pointer"
        />
        <Div d="flex" m={{ b: "2rem" }}>
          <Icon
            name="InfoSolid"
            color="warning700"
            m={{ t: "0.35rem", r: "0.5rem" }}
          />
          <Text p={{ l: "0.5rem", t: "0.5rem" }} textSize="heading">
            Investment Class details
          </Text>
        </Div>
        <Div m={{ b: "4rem" }}>
        <Text p="0.5rem">Investment name: <span style={{color:"orange"}}>{myClassName}</span></Text>
        <Text p="0.5rem">Investment Class : <span style={{color:"orange"}}>{myClassName}</span></Text>
       <Text p="0.5rem">Invested on: <span style={{color:"orange"}}>{myClassName}</span></Text>
       <Text p="0.5rem">Performance: <span style={{color:"orange"}}>{myClassName}</span></Text>
        </Div>
        <Div p="0.5rem">
         
          // Input With for pay


  


        </Div>
      </Modal>
    </>
  );
};


  return (
    <>
      <main className="main-content main-content-side">
        <Topbar />
        <div className="bottom-container">
          <div className="bottom-container__left">
            <div className="box total-box">
              <div className="total-box__left">
                <div className="header-container">
                  <h3 className="section-header">Totol Investment deposit</h3>
                  {increasePercentage > 0 ? <ArrowUp /> : <ArrowDown />}
                </div>
                <h1 className="price">
                  UGX{deposit}
                  <span className="price-currency">(UGX)</span>
                </h1>
                <p>
                  <span
                    className={
                      increasePercentage > 0
                        ? "percentage-increase"
                        : "percentage-decrease"
                    }
                  >
                    {increasePercentage > 0
                      ? `+${increasePercentage}%`
                      : `${decreasePercentage}%`}
                  </span>{" "}
                  compared to last week{" "}
                </p>
              </div>
              <div className="total-box__right">
                <div className="header-container">
                  <h3 className="section-header">Your wallet balance</h3>
                  {increasePercentage > 0 ? <ArrowUp /> : <ArrowDown />}
                </div>
                <h1 className="price">
                  {Wallet}
                  <span className="price-currency">(USD)</span>
                </h1>
                <p>
                  <span
                    className={
                      increasePercentage > 0
                        ? "percentage-increase"
                        : "percentage-decrease"
                    }
                  >
                    {increasePercentage > 0
                      ? `+${increasePercentage}%`
                      : `${decreasePercentage}%`}
                  </span>{" "}
                  compared to last week{" "}
                </p>
              </div>
            </div>
            <div className="box transaction-box">
              <div className="header-container">
                <h3 className="section-header">Investment performace</h3>
                <div className="date-selector">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1.5V3.75"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 1.5V3.75"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.625 6.8175H15.375"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.7713 10.275H11.778"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.7713 12.525H11.778"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.99686 10.275H9.00359"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.99686 12.525H9.00359"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.22049 10.275H6.22723"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.22049 12.525H6.22723"
                      stroke="#292D32"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>1 Jan - 1 Feb 2022</span>
                </div>
              </div>
              <table className="transaction-history">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>
                      Date
                      <Icon name="DownArrow" size="20px" />
                    </th>
                    <th>
                      Bought
                      <Icon name="DownArrow" size="20px" />
                    </th>
                    <th>
                      selling
                      <Icon name="DownArrow" size="20px" />
                    </th>

                    <th>
                      Status
                      <Icon name="DownArrow" size="20px" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr key={index} style={{ backgroundColor: rowColors[index % rowColors.length] }}>
                      <td>
                        <StatusIcon status={transaction.code} />
                        {transaction.icon}
                        {transaction.name}
                      </td>
                      <td>{transaction.date}</td>
                      <td>{transaction.bought}</td>
                      <td>{transaction.selling}</td>
                     
                      <td>
                        <StatusDot status={transaction.status} />
                        
                      </td>
                      <td>
                        {" "}
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
                            
                            setClassID(transaction.class_id);
                            setClassName(transaction.name);
                            
                            setCurrentValue(transaction.bought);
                            
                         
                          }}
                        >
                          Update
                        </Button>
                        {showModal && (
                          <Rem4FromTopModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                          />
                        )}
                      </td>
                       <td><Icon name="InfoSolid"  color ="#252869"size="20px" onClick={() =>{ setMoreInfo(true)
                                     setClassID(transaction.class_id);
                            setClassName(transaction.name);
                            
                            setCurrentValue(transaction.bought);
                            
                       }
                       }/></td>
                    </tr>
                  ))}
                </tbody>
                <MoreInfo
          isOpen={moreInfo}
          onClose={() => {
          setMoreInfo(false);
          }}
        />
              </table>
            </div>
          </div>
          <div className="bottom-container__right">
            <div className="box">
              <div className="header-container">
                <h3 className="section-header">Withdraw requests</h3>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10.4166C3.9 10.4166 3 11.3541 3 12.5C3 13.6458 3.9 14.5833 5 14.5833C6.1 14.5833 7 13.6458 7 12.5C7 11.3541 6.1 10.4166 5 10.4166Z"
                    stroke="#1A202C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M19 10.4166C17.9 10.4166 17 11.3541 17 12.5C17 13.6458 17.9 14.5833 19 14.5833C20.1 14.5833 21 13.6458 21 12.5C21 11.3541 20.1 10.4166 19 10.4166Z"
                    stroke="#1A202C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 10.4166C10.9 10.4166 10 11.3541 10 12.5C10 13.6458 10.9 14.5833 12 14.5833C13.1 14.5833 14 13.6458 14 12.5C14 11.3541 13.1 10.4166 12 10.4166Z"
                    stroke="#1A202C"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <h1 className="price">
                {Withdraw}
                <span className="price-currency">(USD)</span>
              </h1>
              <p>From Jan 01, 2022 to Jan 31, 2022</p>
              <div className="button-box">
              <Button  onClick={handleWithdraw}>{WbuttonText}</Button>
              </div>
            </div>
            <div className="box spending-box">
              <div className="header-container">
                <h3 className="section-header">Spend by category</h3>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10.4166C3.9 10.4166 3 11.3541 3 12.5C3 13.6458 3.9 14.5833 5 14.5833C6.1 14.5833 7 13.6458 7 12.5C7 11.3541 6.1 10.4166 5 10.4166Z"
                    stroke="#1A202C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M19 10.4166C17.9 10.4166 17 11.3541 17 12.5C17 13.6458 17.9 14.5833 19 14.5833C20.1 14.5833 21 13.6458 21 12.5C21 11.3541 20.1 10.4166 19 10.4166Z"
                    stroke="#1A202C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 10.4166C10.9 10.4166 10 11.3541 10 12.5C10 13.6458 10.9 14.5833 12 14.5833C13.1 14.5833 14 13.6458 14 12.5C14 11.3541 13.1 10.4166 12 10.4166Z"
                    stroke="#1A202C"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="pie-chart">
                <canvas id="myChart2" height="220px" width="220px"></canvas>
              </div>
              <div className="overall-spending">
                <h4>Overall Spending</h4>
                <span>$19,760,00</span>
              </div>
              <div className="pie-chart__labels">
                <div className="pie-chart__labels-item">
                  <div className="label">
                    <div className="label__color first"></div>
                    Employees Salary
                  </div>
                  $8.000.00
                </div>
                <div className="pie-chart__labels-item">
                  <div className="label">
                    <div className="label__color second"></div>
                    Material Supplies
                  </div>
                  $2.130.00
                </div>
                <div className="pie-chart__labels-item">
                  <div className="label">
                    <div className="label__color third"></div>
                    Company tax
                  </div>
                  $1.510.00
                </div>
                <div className="pie-chart__labels-item">
                  <div className="label">
                    <div className="label__color fourth"></div>
                    Maintenance system
                  </div>
                  $2.245.00
                </div>
                <div className="pie-chart__labels-item">
                  <div className="label">
                    <div className="label__color fifth"></div>
                    Development System
                  </div>
                  $4.385.00
                </div>
                <div className="pie-chart__labels-item">
                  <div className="label">
                    <div className="label__color sixth"></div>
                    Production Tools
                  </div>
                  $1.000.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
