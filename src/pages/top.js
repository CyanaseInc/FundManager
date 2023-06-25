
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../docs/app.css";

function Topbar (){

const [Bio, setBio] = useState();
  const [Classz, setClass] = useState([]);
   const [Name, setName] = useState();
   const [Pic, setPic] = useState();
  const [Performance, setPerformance] = useState([]);
const postData = async () => {
  
  try {
    const data = JSON.parse(localStorage.getItem("loginData"));
    const email = data.email;
    const response = await axios.post('https://fund.cyanase.com/fund/profile.php', { email });
localStorage.setItem("profile", JSON.stringify(response.data.user));
    setClass(response.data.totalClasses);
    setPerformance(response.data.performance)
    setBio(response.data.user.bio);
    setName(response.data.user.name);// Handle the response data accordingly
    setPic(response.data.user.profile_pic)
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    
  postData(); // Call the function when the component mounts
}, []);



    return(
<>
<div className="top-container">
<div action="#" className="search">
    <svg className="search__icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5418 19.25C15.3513 19.25 19.2502 15.3512 19.2502 10.5417C19.2502 5.73223 15.3513 1.83337 10.5418 1.83337C5.73235 1.83337 1.8335 5.73223 1.8335 10.5417C1.8335 15.3512 5.73235 19.25 10.5418 19.25Z" stroke="#596780" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.1668 20.1667L18.3335 18.3334" stroke="#596780" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>         
    <input type="text" className="search__input" placeholder="Search something here"/>           
</div>
<div className="user-nav">
    <button className="notification">
        <svg className="notification__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
            <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
        </svg>                            
    </button>
    <div className="user-info">
        <div >
       <img width="80"src={`https://fund.cyanase.com/fund/profile_pic/${Pic}`} 

          className=" rounded-full object-center object-cover"
          alt="Profile Image"
        />
      </div>
        <span className="user-name">{Name}</span>                        
    </div>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="#596780" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>    
</div>
</div>
</>




    )
}
export default Topbar
