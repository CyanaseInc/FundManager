import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../docs/app.css";
import Topbar from "./top";
import { BankIcon, Greendot, Hold, Reddot, Yellowdot } from "./svg";
import InvestmentSelect from "./InvestmentSelect";
import { Icon } from "atomize";

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

function Product() {
  const [transactionData, setTransactionData] = useState([]);
  const [myClasses, setClasses] = useState([]);
  useEffect(() => {
    
    const classdata = JSON.parse(localStorage.getItem('myclasses'));
   setClasses(classdata)
   
    axios
      .get("your_api_endpoint")
      .then((response) => {
        setTransactionData(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving transaction data:", error);
      });
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
                  <h3 className="section-header">Your Investment classes</h3>
                </div>
                {myClasses.map((item) => (
                    
                    <ol>
                        <li  key={item.id}> 
                       <p>{item.name}</p> 
                        </li>
                    </ol>
                    
                  
                
                  ))}
                
                <p>
                  <span className="percentage-increase">20%</span> increase
                  compared to last week
                </p>
              </div>
              <div className="total-box__right">
                <div className="header-container">
                  <h3 className="section-header">Add classes</h3>
                  <span className="price-currency">Choose options</span>
                </div>
                <InvestmentSelect />
              </div>
            </div>
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
                    <th>Transactions</th>
                    <th>
                      Date
                      <Icon name="DownArrow" size="20px" />
                    </th>
                    <th>
                      Amount
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
            <div className="box spending-box">
              <div className="header-container">
                <h3 className="section-header">Assest allocation</h3>
                <Icon name="Options" size="20px" />
              </div>
              <div className="pie-chart">
                <canvas id="myChart2" height="220px" width="220px"></canvas>
              </div>
              <div className="overall-spending">
                <h4>Total assets</h4>
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
}
export default Product;
