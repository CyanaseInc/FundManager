import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../src/components/routerScroll';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Div, StyleReset, ThemeProvider } from 'atomize';

import Dashboard from '../src/pages/dashboard';
import Login from '../src/pages/login';

import Setting from '../src/pages/setting';
import Signup from '../src/pages/signup';
import Verify from '../src/pages/verify';
import Invest from '../src/pages/invest';
import Product from '../src/pages/product';
import Home from '../src/pages/home';


const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();

const engine = new Styletron();

const theme = {
  colors: {
    black900: '#1d1d1e',
  },
};

function App() {
  return (
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <ThemeProvider theme={theme}>
        <StyleReset />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Setting/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/verification" element={<Verify/>} />
            <Route path="/Invest" element={<Invest/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/product" element={<Product/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </StyletronProvider>
  );
}

export default App;
