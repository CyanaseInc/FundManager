import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Link } from "react-router-dom";
import "../../docs/app.css";
import Topbar from "./top";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, Icon, Modal, Div, Text, Row, Col } from "atomize";
import {
  ArrowDown,
  ArrowUp,
  BankIcon,
  Reddot,
  Yellowdot,
  Greendot,
} from "./svg";
/// Modal chages/update

//// status dots
function StatusDot({ status }) {
  let dotComponent;

  switch (status) {
    case "1":
      dotComponent = <Greendot />;
      break;
    case "2":
      dotComponent = <Yellowdot />;
      break;
    case "0":
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
  const [increasePercentage, setIncreasePercentage] = useState(20);
  const [decreasePercentage, setDecreasePercentage] = useState(10);
  const [Wallet, setWallet] = useState("0.00");
  const [deposit, setDeposit] = useState("0.00");
  const [Withdraw, setWithdraw] = useState("0.00");
  const [showModal, setShowModal] = useState(false);
  const [myClassID, setClassID] = useState(false);
  const [myClassName, setClassName] = useState(false);
  const [myValue, setValue] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const loginData = JSON.parse(localStorage.getItem("loginData"));

      try {
        const response = await axios.post(
          "http://localhost/cyanase/fund_home.php",
          {
            email: loginData.email,
          }
        );

        const data = response.data;
        setWallet(response.data.totalWallet);
        setDeposit(response.data.totalDeposit);
        setWithdraw(response.data.totalWithdraw);
        setTransactionData(response.data.investmentPerformace);
        console.log(response.data);
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
          // Handle error case
        }
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchData();
  }, []);
  /// INVESTOR UPDATE MODAL

  const Rem4FromTopModal = ({ isOpen, onClose }) => {
    const [currentValue, setCurrentValue] = useState("");
    const [newValue, setNewValue] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [attachment, setAttachment] = useState(null);

    const handleInputChange = (e, setter) => {
      setter(e.target.value);
    };

    const handleAttachmentChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type === "application/pdf") {
        setAttachment(file);
      } else {
        alert("Please select a PDF file for attachment.");
      }
    };

    const handleTextFormat = (format) => {
      const quill = document.querySelector('.email-body .ql-editor');
      const selection = quill.getSelection();
      const selectedText = quill.getText(selection.index, selection.length);
  
      let modifiedText;
  
      switch (format) {
        case 'bold':
          modifiedText = `<strong>${selectedText}</strong>`;
          break;
        case 'italic':
          modifiedText = `<em>${selectedText}</em>`;
          break;
        case 'paragraph':
          modifiedText = `<p>${selectedText}</p>`;
          break;
        default:
          modifiedText = selectedText;
      }
  
      quill.insertHTML(selection.index, modifiedText);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate inputs before submitting
      if (
        !currentValue ||
        !newValue ||
        !emailSubject ||
        !emailBody ||
        !attachment
      ) {
        alert("Please fill in all fields and attach a PDF file.");
        return;
      }

      const formData = new FormData();
      formData.append("currentValue", currentValue);
      formData.append("newValue", newValue);
      formData.append("emailSubject", emailSubject);
      formData.append("emailBody", emailBody);
      formData.append("attachment", attachment);

      try {
        // Send data using Axios
        const response = await axios.post("YOUR_API_ENDPOINT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle response as needed
        console.log(response.data);

        // Close the modal
        onClose();
      } catch (error) {
        console.error(error);
      }
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
          <h4 p={{ l: "0.5rem", t: "0.25rem" }} textSize="heading">
            Investment Updater
          </h4>
        </Div>
        <span>
          Let people that invest with you track their investment performance
        </span>
        <Div m={{ t: "1rem" }} d="flex" align="center">
          <h4>{myClassName}</h4>
        </Div>
        <form onSubmit={handleSubmit}>
          <div className="field_input">
            <div className="field_input-container">
              <Row d="flex">
                <Col>
                  <input
                    type="email"
                    value={currentValue}
                    onChange={(e) => handleInputChange(e, setCurrentValue)}
                    className="field_input-field"
                    placeholder="Current value"
                  />
                </Col>
                <Col>
                  <input
                    type="email"
                    value={newValue}
                    onChange={(e) => handleInputChange(e, setNewValue)}
                    className="field_input-field"
                    placeholder="New value"
                  />
                </Col>
              </Row>
            </div>
          </div>
          <Div>
            <div className="field_input">
              <div className="field_input-container">
                <input
                  type="email"
                  value={emailSubject}
                  onChange={(e) => handleInputChange(e, setEmailSubject)}
                  className="field_input-field"
                  placeholder="Email subject"
                />
              </div>
            </div>
          </Div>
          <div className="field_input">
            <div className="field_input-container">
            
                <ReactQuill
            value={emailBody}
            onChange={setEmailBody}
            className="email-body field_input-field"
            placeholder="Enter text"
          />
            </div>
          </div>

          <Div d="flex" align="center">
        
           

          </Div>
          <Div>
            <label htmlFor="attachmentInput" className="attachment-label">
              <Icon
                name="Attachment"
                pos="relative"
                top="2px"
                right="5px"
                size="20px"
              />
              Attach fact sheet in PDF
            </label>
            <input
              type="file"
              id="attachmentInput"
              accept="application/pdf"
              onChange={handleAttachmentChange}
              style={{ display: "none" }}
            />
          </Div>

          <Div d="flex" justify="flex-end">
            <Button type="submit" bg="info700">
              Yes, Submit
            </Button>
          </Div>
        </form>
      </Modal>
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
                      Increase
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
                    <tr key={index}>
                      <td>
                        <StatusIcon status={transaction.code} />
                        {transaction.icon}
                        {transaction.name}
                      </td>
                      <td>{transaction.date}</td>
                      <td>{transaction.bought}</td>
                      <td>{transaction.selling}</td>
                      <td>{transaction.performance_value}</td>
                      <td>
                        <StatusDot status={transaction.satus} />
                        {transaction.status}
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
                            setValue(transaction.selling);
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
                    </tr>
                  ))}
                </tbody>
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
                <Button>Authorize</Button>
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
