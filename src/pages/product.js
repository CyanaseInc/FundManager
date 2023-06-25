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
function getClassColor(index) {
  switch (index) {
    case 0:
      return 'first';
    case 1:
      return 'second';
    case 2:
      return 'third';
    default:
      return '';
  }
}

function Product() {
  
  const [totaFund, setTotalFund] = useState("0.00");
  const [myClasses, setClasses] = useState([]);
  const [myAllocatedClasses, setAllocatedClasses] = useState([]);
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const classdata = JSON.parse(localStorage.getItem('myclasses'));
   setClasses(classdata);
   
   const fetchData = async () => {
          try {
        const response = await axios.post(
          "https://fund.cyanase.com/fund/allocation.php",
          {
            email: loginData.email,
          }
        );
 
setTotalFund(response.data[0].total_amount_fund_manager);
setAllocatedClasses(response.data);
        // Check the response from fund_login.php

      } catch (error) {
        console.error(error);
        // Handle error case
      }
}
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
                  <h3 className="section-header">Your Investment classes</h3>
                </div>
                {myClasses.map((item) => (
                    
                    <ul>
                        <li key={item}> 
                       <p>{item.name}</p> 
                        </li>
                    </ul>
                    
                  
                
                  ))}
                
                
              </div>
              <div className="total-box__right">
                <div className="header-container">
                  <h3 className="section-header">Add classes</h3>
                  <span className="price-currency">Choose options</span>
                </div>
                <InvestmentSelect />
              </div>
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
                <span>UGX {totaFund}</span>
              </div>
              <div className="pie-chart__labels">
               { myAllocatedClasses.map ((classes, index ) => (
                <div key={index} className="pie-chart__labels-item">
                  <div className="label">
<div className={`label__color ${getClassColor(index)}`}></div>
                    
                    {classes.investmentclasses}
                  </div>
                  UGX {classes.total_amount}
                </div>
                ))}
               
                

                
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Product;