import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import "../../docs/index.css";
import axios from "axios";


const Profile = () => {
  const colors = ['yellow', 'green', 'blue', 'indigo'];
 const [Bio, setBio] = useState();
  const [Classz, setClass] = useState([]);
   const [Name, setName] = useState();
   const [Pic, setPic] = useState();
  const [Performance, setPerformance] = useState([]);
  const [cprofile, setCprofile] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('user');
 
 
  const postData = async () => {
  
  try {
    const response = await axios.post('https://fund.cyanase.com/fund/profile.php', { email });
    
    setClass(response.data.totalClasses);
    setPerformance(response.data.performance)
    setBio(response.data.user.bio);
    setCprofile(response.data.user.company_profile);
    setName(response.data.user.name);// Handle the response data accordingly
    setPic(response.data.user.profile_pic)
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    
  postData(); // Call the function when the component mounts
}, []);

// or
const handleDownload = () => {
    

const fileUrl = `https://fund.cyanase.com/fund/company_profile/${cprofile}`;


    // Trigger file download
    window.open(fileUrl, '_blank');
  };


  return (
   
  <div className=" container bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden">
    <div className="image h-140px bg-gradient-to-r from-cyan-500 to-blue-500"></div>

    <div className="px-5 py-2 flex flex-col gap-3 pb-6">
      <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white image-container">
       <img src={`https://fund.cyanase.com/fund/profile_pic/${Pic}`} 

          className="w-full h-full rounded-full object-center object-cover"
          alt="Profile Image"
        />
      </div>

      <div>
        <h3 className="text-xl text-slate-900 relative font-bold leading-6">{Name}</h3>
        <p className="text-sm text-gray-600">@{Name}</p>
      </div>
<div className="flex gap-3 flex-wrap">
  {Classz.map((Classz, index) => (
    <span
      key={index}
      className={`rounded-sm bg-${colors[index % colors.length]}-100 px-3 py-1 text-xs font-medium text-${colors[index % colors.length]}-800`}
  >
      {Classz.name}
    </span>
  ))}
</div>

      

      <div className="flex gap-2">
        <button
          type="button"
          onClick ={handleDownload}
          className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 risk-button focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Company profile
        </button>
<a href ="https://auth.cyanase.com/signup">
        <button
          type="button"
          className="inline-flex w-auto invest-button cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Invest with {Name}
        </button>
        </a>
      </div>

      <h4 className="text-md font-medium leading-3">About</h4>
      <p className="text-sm text-stone-500">
       {Bio}
      </p>

      <h4 className="text-md font-medium leading-3">Portfolios</h4>
      <div className="flex flex-col gap-3">
      { Performance.map((per,index)=>(
      
      

      
        <div key ={index} className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full">
         
          <div className="leading-3">
            <p className="text-sm font-bold text-slate-700">{per.class}</p>
            <span className="text-xs text-slate-600">minimum deposit: UGX {per.minimum}</span>
          </div>
          <p className="text-sm text-slate-500 self-start ml-auto">{per.options}</p>
        </div>
      ))}


        
      </div>
    </div>
  </div>
  )
};

export default Profile;
