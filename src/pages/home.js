import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../docs/app.css";
import Topbar from "./top";
import { Button, Icon } from "atomize";
import { ArrowDown, ArrowUp } from "./svg";

function StatusDot({ status }) {
  let dotComponent;

  switch (status) {
    case "Completed":
      dotComponent = <Greendot />;
      break;
    case "Pending":
      dotComponent = <Yellowdot />;
      break;
    case "On Hold":
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
  const[Wallet, setWallet] = useState("0.00");
  const[deposit, setDeposit] = useState("0.00");
  const[Withdraw, setWithdraw] = useState("0.00");
 

  useEffect(() => {
    const fetchData = async () => {
      const loginData = JSON.parse(localStorage.getItem("loginData"));
      console.log(loginData);
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
        console.log(response.data.investmentPerformace)
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
                  {
                      increasePercentage > 0
                        ? <ArrowUp/>
                        : <ArrowDown/>
                    }
                  
           
                </div>
                <h1 className="price">
                  UGX{deposit}<span className="price-currency">(UGX)</span>
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
                  {
                      increasePercentage > 0
                        ? <ArrowUp/>
                        : <ArrowDown/>
                    }
                </div>
                <h1 className="price">
                 {Wallet}<span className="price-currency">(USD)</span>
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
                        <BankIcon />
                        {transaction.type}
                      </td>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                      <td>
                        <StatusDot status={transaction.status} />
                        {transaction.status}
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
                {Withdraw}<span className="price-currency">(USD)</span>
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
