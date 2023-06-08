import React, { useState } from 'react';

import { Route, Routes,Link } from 'react-router-dom';
import "../../docs/app.css";
import NavBar from '../components/NavBar';
import Home from './home';
import Invest from './invest';
import Product from './product';
import Setting from './setting';

function Dashboard (){


    return (
        <div className='="container'>
        <div className="app">
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/home" element={<Home />} />
      <Route path="/Invest" element={<Invest/>} />
      <Route path="/setting" element={<Setting/>} />
      <Route path="/product" element={<Product/>} />
     
    </Routes>
  </div>
        </div>
      );




    
}
export default Dashboard